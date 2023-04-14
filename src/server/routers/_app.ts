import { router } from "../trpc"
import { profile } from "./profile"
import { profileUpdate } from "./profileUpdate"
import { avatarUpdate } from "./avatarUpdate"
import { streamSecretReset } from "./streamSecretReset"
import { activity } from "./activity"
import { feed } from "./feed"
import { userGet } from "./userGet"
import { streamView } from "./streamView"
import { streamChatSend } from "./streamChatSend"
import { streamPublish } from "./streamPublish"
import { postCreate } from "./postCreate"
import { postGet } from "./postGet"
import { postReplyCreate } from "./postReplyCreate"

export const appRouter = router({
	profile,
	profileUpdate,
	avatarUpdate,
	streamSecretReset,
	activity,
	feed,
	userGet,
	streamView,
	streamChatSend,
	streamPublish,
	postCreate,
	postGet,
	postReplyCreate,
})

export type AppRouter = typeof appRouter
