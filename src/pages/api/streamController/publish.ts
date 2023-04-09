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

	// get current stream
	let stream = await prisma.stream.findFirst({
		where: {
			userId: user.id,
			OR: [
				{
					endedAt: null,
				},
				{
					endedAt: {
						gt: new Date(new Date().getTime() - 1000 * 60),
					},
				},
			],
		},
	})

	if (stream) {
		// resume previous stream
		await prisma.stream.update({
			where: {
				id: stream.id,
			},
			data: {
				endedAt: null,
			},
		})

		// update user
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				streamActive: true,
			},
		})
	} else {
		// create new stream
		await prisma.stream.create({
			data: {
				userId: user.id,
			},
		})

		// update user
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
