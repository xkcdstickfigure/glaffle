import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const postCreate = procedure
	.input(
		z.object({
			content: z.string(),
		})
	)
	.mutation(async ({ input: { content }, ctx: { me } }) => {
		if (!me) return

		// format content
		content = content.trim()
		if (!content || content.length > 512) return

		// create post
		await prisma.post.create({
			data: {
				content: content.trim(),
				userId: me.id,
			},
		})
	})
