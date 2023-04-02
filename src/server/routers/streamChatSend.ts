import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const streamChatSend = procedure
	.input(
		z.object({
			content: z.string(),
			channel: z.string(),
		})
	)
	.mutation(async ({ input: { content, channel: channelId }, ctx: { me } }) => {
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

		console.log(message.content)
	})
