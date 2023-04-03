import { z } from "zod"
import { procedure } from "../trpc"
import { prisma } from "../prisma"

export const streamView = procedure
	.input(
		z.object({
			channelId: z.string(),
		})
	)
	.mutation(async ({ input: { channelId }, ctx: { me } }) => {
		if (!me) return null

		// count views
		let count = await prisma.streamView.count({
			where: {
				userId: me.id,
				createdAt: {
					gt: new Date(new Date().getTime() - 30000),
				},
			},
		})
		if (count > 0) return null

		// create view
		try {
			await prisma.streamView.create({
				data: {
					userId: me.id,
					channelId,
				},
			})
		} catch (err) {}
	})
