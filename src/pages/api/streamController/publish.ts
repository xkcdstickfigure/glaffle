import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { prisma } from "@/server/prisma"

const schema = z.object({
	name: z.string(),
	secret: z.string(),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// parse body
	let body = schema.safeParse(req.body)
	if (!body.success) return res.status(400).send("bad request")
	let { name: userId, secret } = body.data

	// get user
	let user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	})
	if (!user || !user.streamSecret || user.streamSecret !== secret)
		return res.status(400).send("invalid stream key")

	// determine whether to resume previous stream
	let hasStarted = !!user.streamStartedAt
	let hasEnded = !!user.streamEndedAt
	let hasEndedRecently = user.streamEndedAt
		? user.streamEndedAt.getTime() > new Date().getTime() - 60000
		: false
	let resume = hasStarted && (!hasEnded || hasEndedRecently)

	if (resume) {
		// resume stream
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				streamActive: true,
			},
		})
	} else {
		// start new stream, reset information
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				streamActive: true,
				streamPublished: false,
				streamStartedAt: new Date(),
				streamTitle: null,
			},
		})
	}

	// response
	res.send(null)
}
