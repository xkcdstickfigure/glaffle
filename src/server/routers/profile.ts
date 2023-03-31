import { procedure } from "../trpc"

export const profile = procedure.query(async ({ ctx: { me } }) => {
	if (!me) return null

	return {
		id: me.id,
		username: me.username,
		avatar: me.avatar,
		streamActive: me.streamActive,
	}
})
