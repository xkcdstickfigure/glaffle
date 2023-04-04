import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const userGet = procedure
	.input(
		z.object({
			username: z.string(),
		})
	)
	.query(async ({ input: { username } }) => {
		let user = await prisma.user.findUnique({
			where: {
				username: username.toLowerCase(),
			},
		})
		if (!user) return null

		// count viewers
		let viewerCount = 0
		if (user.streamActive) {
			viewerCount = await prisma.user.count({
				where: {
					viewingId: user.id,
					viewingDate: {
						gt: new Date(new Date().getTime() - 60000),
					},
				},
			})
		}

		// get top viewers
		let viewers
		if (user.streamActive) {
			viewers = await prisma.user.findMany({
				where: {
					viewingId: user.id,
					viewingDate: {
						gt: new Date(new Date().getTime() - 60000),
					},
				},
				orderBy: {
					createdAt: "asc",
				},
				take: 5,
			})
		}

		return {
			id: user.id,
			username: user.usernameDisplay,
			avatar: user.avatar,
			streamActive: user.streamActive,
			streamTitle: user.streamTitle,
			viewerCount,
			viewers:
				viewers?.map((viewer) => ({
					id: viewer.id,
					username: viewer.usernameDisplay,
					avatar: viewer.avatar,
				})) ?? [],
		}
	})
