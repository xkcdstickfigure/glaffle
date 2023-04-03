import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"
import Pusher from "pusher"
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
		if (!me) return null

		// get channel
		let channel = await prisma.user.findUnique({
			where: {
				id: channelId,
			},
		})
		if (!channel) return null

		// create in database
		let message = await prisma.streamMessage.create({
			data: {
				content: content.trim(),
				authorId: me.id,
				channelId: channel.id,
			},
		})

		// emit to pusher
		pusher.trigger("stream-chat-" + channel.id, "message-create", {
			message: {
				id: message.id,
				authorId: me.id,
				authorUsername: me.usernameDisplay,
				content: message.content,
				date: message.createdAt,
			},
		})
	})
