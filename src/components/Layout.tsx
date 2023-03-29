import { DetailedHTMLProps, HTMLAttributes } from "react"
import Head from "next/head"
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

		<div className="flex h-full">
			<Sidebar />

			<div className="flex-grow p-8 overflow-y-auto">{children}</div>
		</div>
	</>
)
