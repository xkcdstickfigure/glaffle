import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { AppRouter } from "@/server/routers/_app"

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				httpBatchLink({
					url: "/api/trpc",
				}),
			],
		}
	},
})
