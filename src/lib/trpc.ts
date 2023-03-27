import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { AppRouter } from "@/server/routers/_app"
import { getCookie } from "cookies-next"

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				httpBatchLink({
					url: "/api/trpc",
					headers() {
						let token = getCookie("token")?.toString()
						return token
							? {
									Authorization: token,
							  }
							: {}
					},
				}),
			],
		}
	},
})
