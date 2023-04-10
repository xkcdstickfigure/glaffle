import { router } from "../trpc"
import { profile } from "./profile"
import { profileUpdate } from "./profileUpdate"
import { activity } from "./activity"
import { userGet } from "./userGet"
import { streamView } from "./streamView"
import { streamChatSend } from "./streamChatSend"
import { streamPublish } from "./streamPublish"

export const appRouter = router({
	profile,
	profileUpdate,
	activity,
	userGet,
	streamView,
	streamChatSend,
	streamPublish,
})

export type AppRouter = typeof appRouter
