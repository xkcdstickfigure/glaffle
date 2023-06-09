import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const activity = procedure.query(async () => {
	let streamers = await prisma.user.findMany({
		where: {
			streamActive: true,
			streamPublished: true,
		},
		take: 10,
		orderBy: {
			createdAt: "asc",
		},
	})

	return {
		streamers: streamers.map((streamer) => ({
			id: streamer.id,
			username: streamer.usernameDisplay,
			avatar: streamer.avatar,
			title: streamer.streamTitle ?? "",
		})),
	}
})
