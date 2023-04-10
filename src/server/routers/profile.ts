import { procedure } from "../trpc"

export const profile = procedure.query(async ({ ctx: { me } }) => {
	if (!me) return null

	return {
		id: me.id,
		username: me.usernameDisplay,
		avatar: me.avatar,
		description: me.description,
		streamActive: me.streamActive,
		streamPublished: me.streamPublished,
	}
})
