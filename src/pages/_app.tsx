import { AppType } from "next/app"
import { trpc } from "../lib/trpc"
import { PusherProvider } from "@/lib/pusher"
import "../style.css"

const App: AppType = ({ Component, pageProps }) => (
	<PusherProvider>
		<Component {...pageProps} />
	</PusherProvider>
)

export default trpc.withTRPC(App)
