import { router } from "../trpc"
import { profile } from "./profile"
import { feed } from "./feed"
import { userGet } from "./userGet"

export const appRouter = router({ profile, feed, userGet })

export type AppRouter = typeof appRouter
