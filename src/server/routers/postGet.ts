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
				replies: {
					include: {
						user: true,
					},
					take: 50,
					orderBy: {
						createdAt: "desc",
					},
				},
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
			replies: post.replies.map((reply) => ({
				id: reply.id,
				author: {
					id: reply.user.id,
					username: reply.user.usernameDisplay,
					avatar: reply.user.avatar,
				},
				content: reply.content,
				date: reply.createdAt,
			})),
		}
	})
