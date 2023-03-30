import { router } from "../trpc"
import { profile } from "./profile"
import { feed } from "./feed"
import { postCreate } from "./postCreate"
import { userGet } from "./userGet"

export const appRouter = router({ profile, feed, postCreate, userGet })

export type AppRouter = typeof appRouter
