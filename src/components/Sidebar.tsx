import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { SidebarStreamer } from "./SidebarStreamer"

export const Sidebar = () => {
	let { data: activity } = trpc.activity.useQuery()

	return (
		<div className="bg-neutral-800 w-64 flex-shrink-0 space-y-4">
			<Link
				href="/"
				className="flex space-x-2 justify-center items-center mt-8"
			>
				<div className="w-8 h-8 rounded-md bg-emerald-400" />
				<p className="text-3xl font-semibold">Glaffle</p>
			</Link>

			<div className="px-4">
				{activity?.streamers.map((streamer) => (
					<SidebarStreamer key={streamer.id} {...streamer} />
				))}
			</div>
		</div>
	)
}
