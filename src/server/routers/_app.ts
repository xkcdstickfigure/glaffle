import { router } from "../trpc"
import { userGet } from "./userGet"

export const appRouter = router({ userGet })

export type AppRouter = typeof appRouter
