import { AppType } from "next/app"
import { trpc } from "../lib/trpc"
import "../style.css"

const App: AppType = ({ Component, pageProps }) => <Component {...pageProps} />

export default trpc.withTRPC(App)
