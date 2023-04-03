import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"
import { pusherKey } from "@/env"

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
			try {
				let rows =
					await prisma.$queryRaw`select count(distinct "userId") from "streamView" where "channelId" = ${user.id}::uuid and "createdAt" > now() - interval '1 minute'`

				// @ts-expect-error
				viewerCount = Number(rows[0].count)
			} catch (err) {}
		}

		// get top viewers
		let viewers
		if (user.streamActive) {
			viewers = await prisma.streamView.findMany({
				where: {
					channelId: user.id,
					createdAt: {
						gt: new Date(new Date().getTime() - 60000),
					},
				},
				include: {
					user: true,
				},
				orderBy: {
					user: {
						createdAt: "asc",
					},
				},
				distinct: ["userId"],
				take: 5,
			})
		}

		return {
			id: user.id,
			username: user.usernameDisplay,
			avatar: user.avatar,
			streamActive: user.streamActive,
			viewerCount,
			viewers:
				viewers?.map(({ user: viewer }) => ({
					id: viewer.id,
					username: viewer.usernameDisplay,
					avatar: viewer.avatar,
				})) ?? [],
			pusherKey,
		}
	})
