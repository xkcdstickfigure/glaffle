import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const streamPublish = procedure
	.input(
		z.object({
			title: z.string(),
		})
	)
	.mutation(async ({ input: { title }, ctx: { me } }) => {
		if (!me || !me.streamActive || me.streamPublished) return false

		title = title.trim()
		if (title.length > 72) return false

		// update user
		await prisma.user.update({
			where: {
				id: me.id,
			},
			data: {
				streamPublished: true,
				streamTitle: title,
			},
		})

		return true
	})
