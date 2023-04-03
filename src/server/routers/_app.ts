import { router } from "../trpc"
import { profile } from "./profile"
import { activity } from "./activity"
import { userGet } from "./userGet"
import { streamView } from "./streamView"
import { streamChatSend } from "./streamChatSend"

export const appRouter = router({
	profile,
	activity,
	userGet,
	streamView,
	streamChatSend,
})

export type AppRouter = typeof appRouter
