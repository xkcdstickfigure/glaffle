import { router } from "../trpc"
import { profile } from "./profile"
import { activity } from "./activity"
import { feed } from "./feed"
import { postCreate } from "./postCreate"
import { userGet } from "./userGet"

export const appRouter = router({
	profile,
	activity,
	feed,
	postCreate,
	userGet,
})

export type AppRouter = typeof appRouter
