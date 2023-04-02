import { z } from "zod"
import { procedure } from "../trpc"

export const chatSend = procedure
	.input(
		z.object({
			content: z.string(),
		})
	)
	.mutation(async ({ input: { content }, ctx: { me } }) => {
		if (!me) return null
		console.log(`${me.usernameDisplay}: ${content}`)
	})
