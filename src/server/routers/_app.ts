import { router } from "../trpc"
import { profile } from "./profile"
import { userGet } from "./userGet"

export const appRouter = router({ profile, userGet })

export type AppRouter = typeof appRouter
