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
		if (!me || !me.streamActive || me.streamPublished) return

		title = title.trim()
		if (title.length > 72) return

		// update stream
		await prisma.stream.updateMany({
			where: {
				userId: me.id,
				endedAt: null,
			},
			data: {
				publishedAt: new Date(),
				title,
			},
		})

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
	})
