import { router } from "../trpc"
import { profile } from "./profile"
import { activity } from "./activity"
import { userGet } from "./userGet"

export const appRouter = router({
	profile,
	activity,
	userGet,
})

export type AppRouter = typeof appRouter
