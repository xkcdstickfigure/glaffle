import { procedure } from "../trpc"
import { prisma } from "../prisma"
import crypto from "crypto"

export const streamSecretReset = procedure.mutation(async ({ ctx: { me } }) => {
	if (!me) return null

	let secret = crypto.randomBytes(32).toString("hex")

	// update user
	await prisma.user.update({
		where: {
			id: me.id,
		},
		data: {
			streamSecret: secret,
		},
	})

	return `${me.id}?secret=${secret}`
})
