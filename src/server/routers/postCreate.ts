import { z } from "zod"
import { prisma } from "../prisma"
import { procedure } from "../trpc"

export const postCreate = procedure
	.input(
		z.object({
			content: z.string(),
		})
	)
	.mutation(async ({ input: { content }, ctx: { me } }) => {
		if (!me) return null

		// format content
		content = content
			.split("\n")
			.map((l) => l.trim())
			.filter((l) => !!l)
			.join("\n")
		if (!content) return null

		// create post
		let post = await prisma.post.create({
			data: {
				content,
				userId: me.id,
			},
		})

		return post.id
	})
