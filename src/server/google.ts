import { OAuth2Client } from "google-auth-library"
import { origin, googleClientId, googleClientSecret } from "@/env"

const client = new OAuth2Client(googleClientId)

const scope =
	"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"

export const generateAuthUrl = (state: string = "") =>
	"https://accounts.google.com/o/oauth2/v2/auth?" +
	new URLSearchParams({
		client_id: googleClientId,
		redirect_uri: origin + "/auth/callback",
		response_type: "code",
		scope,
		state,
	})

export const getProfile = async (code: string) => {
	// get tokens
	let res = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		body: new URLSearchParams({
			client_id: googleClientId,
			client_secret: googleClientSecret,
			redirect_uri: origin + "/auth/callback",
			grant_type: "authorization_code",
			code,
		}),
	})

	if (res.status !== 200) throw Error("token request failed")

	let tokens: {
		id_token: string
		scope: string
	} = await res.json()

	// check scope
	if (scope !== tokens.scope.split(" ").sort().join(" "))
		throw Error("scope doesn't match")

	// parse id token
	let ticket = await client.verifyIdToken({
		idToken: tokens.id_token,
		audience: googleClientId,
	})

	let payload = ticket.getPayload()
	if (!payload) throw Error("payload is undefined")

	return {
		id: payload.sub,
		name: payload.name!,
		email: payload.email!,
		emailVerified: payload.email_verified!,
	}
}
