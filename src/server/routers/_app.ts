import { router } from "../trpc"
import { profile } from "./profile"
import { activity } from "./activity"
import { userGet } from "./userGet"
import { streamChatSend } from "./streamChatSend"

export const appRouter = router({
	profile,
	activity,
	userGet,
	streamChatSend,
})

export type AppRouter = typeof appRouter
