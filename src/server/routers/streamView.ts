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

		prisma.user
			.update({
				where: {
					id: me.id,
				},
				data: {
					viewingId: channelId,
					viewingDate: new Date(),
				},
			})
			.catch(() => {})
	})
