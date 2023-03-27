import { inferAsyncReturnType } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { prisma } from "./prisma"

export const createContext = async ({
	req,
	res,
}: trpcNext.CreateNextContextOptions) => {
	let token = req.headers.authorization
	if (!token) return { req, res }

	let session = await prisma.session.findUnique({
		where: { token },
		include: {
			user: true,
		},
	})

	return { req, res, me: session?.user }
}

export type Context = inferAsyncReturnType<typeof createContext>
