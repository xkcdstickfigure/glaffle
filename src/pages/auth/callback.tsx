import { GetServerSideProps } from "next"
import { getProfile } from "@/server/google"
import { prisma } from "@/server/prisma"
import crypto from "crypto"
import { setCookie } from "cookies-next"

export default () => <></>

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query: { code },
}) => {
	if (typeof code !== "string") return redirect("/")

	try {
		// get profile from code
		let profile = await getProfile(code)
		if (!profile.emailVerified) throw Error("email not verified")

		// create user
		let user = await prisma.user.upsert({
			where: {
				googleId: profile.id,
			},
			create: {
				username: crypto.randomBytes(4).toString("hex"),
				googleId: profile.id,
				email: profile.email,
				name: profile.name,
			},
			update: {
				email: profile.email,
				name: profile.name,
			},
		})

		// create session
		let address = req.headers["x-forwarded-for"]
		let session = await prisma.session.create({
			data: {
				token: crypto.randomBytes(32).toString("hex"),
				address:
					typeof address === "string"
						? address
						: typeof address === "object"
						? address[0]
						: req.socket.remoteAddress ?? "",
				userAgent: req.headers["user-agent"] ?? "",
				userId: user.id,
			},
		})

		// set cookie
		setCookie("front-token", session.token, {
			req,
			res,
			maxAge: 60 * 60 * 24 * 365,
		})
	} catch (err) {}

	return redirect("/")
}

const redirect = (destination: string) => ({
	redirect: {
		destination,
		permanent: false,
	},
})
