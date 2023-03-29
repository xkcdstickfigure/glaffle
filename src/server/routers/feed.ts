import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const feed = procedure.query(async () => {
	let posts = await prisma.post.findMany({
		include: {
			user: true,
		},
		take: 25,
		orderBy: {
			createdAt: "desc",
		},
	})

	return {
		posts: posts.map((post) => ({
			id: post.id,
			content: post.content,
			date: post.createdAt,
			author: {
				id: post.user.id,
				username: post.user.username,
			},
		})),
	}
})
