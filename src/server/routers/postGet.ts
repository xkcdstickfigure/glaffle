import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const postGet = procedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.query(async ({ input: { id } }) => {
		let post = await prisma.post.findUnique({
			where: { id },
			include: {
				user: true,
			},
		})
		if (!post) return null

		return {
			id: post.id,
			author: {
				id: post.user.id,
				username: post.user.usernameDisplay,
				avatar: post.user.avatar,
			},
			content: post.content,
			date: post.createdAt,
		}
	})
