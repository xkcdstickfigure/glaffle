import { procedure } from "../trpc"

export const profile = procedure.query(async ({ ctx: { me } }) => {
	if (!me) return

	return {
		id: me.id,
		username: me.username,
		streamActive: me.streamActive,
	}
})
