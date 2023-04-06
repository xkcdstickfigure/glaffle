import { ReactNode } from "react"
import Head from "next/head"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

interface Props {
	title?: string
	children?: ReactNode
}

export const Layout = ({ title, children }: Props) => (
	<>
		<Head>
			<title>{`Glaffle${title ? " | " + title : ""}`}</title>
			<link rel="icon" href="/assets/square.svg" />
		</Head>

		<div className="h-full flex flex-col">
			<Header />

			<div className="flex-grow flex overflow-auto">
				<Sidebar />

				<div className="flex-grow overflow-auto">{children}</div>
			</div>
		</div>
	</>
)
