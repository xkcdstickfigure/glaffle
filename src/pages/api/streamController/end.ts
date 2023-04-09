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

	// update stream
	await prisma.stream.updateMany({
		where: {
			userId: user.id,
			endedAt: null,
		},
		data: {
			endedAt: new Date(),
		},
	})

	// update user
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			streamActive: false,
		},
	})

	// response
	res.send(null)
}
