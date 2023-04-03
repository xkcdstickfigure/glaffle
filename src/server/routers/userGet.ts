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

		return {
			id: user.id,
			username: user.usernameDisplay,
			streamActive: user.streamActive,
			pusherKey,
		}
	})
