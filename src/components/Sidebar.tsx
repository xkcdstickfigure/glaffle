import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { Avatar } from "./Avatar"

export const Sidebar = () => {
	let { data: activity } = trpc.activity.useQuery(undefined, {
		refetchInterval: 10000,
	})

	return (
		<div className="bg-neutral-900 border-r border-neutral-800 w-64 flex-shrink-0 p-4 space-y-4">
			<p className="uppercase font-semibold text-sm">Streaming Now</p>

			{activity?.streamers.map(({ id, username, avatar, startedAt }) => {
				let minutes = Math.floor(
					(new Date().getTime() - new Date(startedAt).getTime()) / (1000 * 60)
				)

				return (
					<Link
						key={id}
						href={`/${username}`}
						className="flex items-center space-x-2"
					>
						<Avatar userId={id} avatarId={avatar} className="w-10 h-10" />

						<div>
							<p className="font-medium">{username}</p>
							<p className="text-xs text-neutral-400">
								{minutes > 1
									? `Started ${minutes} minutes ago`
									: "Started just now"}
							</p>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
