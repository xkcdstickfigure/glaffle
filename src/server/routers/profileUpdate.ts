import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const profileUpdate = procedure
	.input(
		z.object({
			username: z.string(),
			description: z.string(),
		})
	)
	.mutation(async ({ input: { username, description }, ctx: { me } }) => {
		if (!me) return false

		// formatting
		username = username.trim() || me.usernameDisplay
		description = description.trim()
		if (
			!username.match(/^[0-9a-zA-Z]+$/) ||
			username.length > 24 ||
			description.length > 128
		)
			return false

		// update user
		await prisma.user.update({
			where: {
				id: me.id,
			},
			data: {
				username: username.toLowerCase(),
				usernameDisplay: username,
				description: description || null,
			},
		})

		return true
	})
