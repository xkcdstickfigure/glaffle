import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"
import Pusher from "pusher"
import { v4 as uuid } from "uuid"
import { pusherAppId, pusherKey, pusherSecret } from "@/env"

const pusher = new Pusher({
	appId: pusherAppId,
	key: pusherKey,
	secret: pusherSecret,
	cluster: "eu",
	useTLS: true,
})

export const streamChatSend = procedure
	.input(
		z.object({
			content: z.string(),
			channelId: z.string(),
		})
	)
	.mutation(async ({ input: { content, channelId }, ctx: { me } }) => {
		if (!me) return

		// format content
		content = content.trim()
		if (!content) return

		// get channel
		let channel = await prisma.user.findUnique({
			where: {
				id: channelId,
			},
		})
		if (!channel) return

		// emit to pusher
		let id = uuid()
		pusher
			.trigger("stream-chat-" + channel.id, "message-create", {
				message: {
					id,
					authorId: me.id,
					authorUsername: me.usernameDisplay,
					content,
					date: new Date(),
				},
			})
			.catch(() => {})

		// create in database
		await prisma.streamMessage.create({
			data: {
				id,
				content: content.trim(),
				authorId: me.id,
				channelId: channel.id,
			},
		})
	})
