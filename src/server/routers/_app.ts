import { router } from "../trpc"
import { profile } from "./profile"
import { activity } from "./activity"
import { userGet } from "./userGet"
import { chatSend } from "./chatSend"

export const appRouter = router({
	profile,
	activity,
	userGet,
	chatSend,
})

export type AppRouter = typeof appRouter
