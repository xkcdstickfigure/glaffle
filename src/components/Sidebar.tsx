import Link from "next/link"

export const Sidebar = () => (
	<div className="bg-neutral-800 w-64 flex-shrink-0">
		<Link href="/" className="flex space-x-2 justify-center items-center mt-8">
			<div className="w-8 h-8 rounded-md bg-emerald-400" />
			<p className="text-3xl font-semibold">Glaffle</p>
		</Link>
	</div>
)
