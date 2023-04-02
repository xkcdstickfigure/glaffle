import { DetailedHTMLProps, HTMLAttributes } from "react"
import Head from "next/head"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

interface Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	title?: string
}

export const Layout = ({ title, children }: Props) => (
	<>
		<Head>
			<title>{`Glaffle${title ? " | " + title : ""}`}</title>
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
