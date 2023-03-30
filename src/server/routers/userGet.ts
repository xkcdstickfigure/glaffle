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

		return {
			id: user.id,
			username: user.username,
			streamActive: user.streamActive,
		}
	})
