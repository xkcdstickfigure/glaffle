import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const postReplyCreate = procedure
	.input(
		z.object({
			content: z.string(),
			postId: z.string(),
		})
	)
	.mutation(async ({ input: { content, postId }, ctx: { me } }) => {
		if (!me) return

		// format content
		content = content.trim()
		if (!content || content.length > 512) return

		// get post
		let post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		})
		if (!post) return

		// create reply
		await prisma.postReply.create({
			data: {
				content: content.trim(),
				postId: post.id,
				userId: me.id,
			},
		})
	})
