import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const feed = procedure.query(async () => {
	let posts = await prisma.post.findMany({
		include: {
			user: true,
			_count: {
				select: {
					replies: true,
				},
			},
		},
		take: 20,
		orderBy: {
			createdAt: "desc",
		},
	})

	return {
		posts: posts.map((post) => ({
			id: post.id,
			author: {
				id: post.user.id,
				username: post.user.usernameDisplay,
				avatar: post.user.avatar,
			},
			content: post.content,
			date: post.createdAt,
			replyCount: post._count.replies,
		})),
	}
})
