import { trpc } from "@/lib/trpc"
import Link from "next/link"

export const Sidebar = () => {
	let { data: activity } = trpc.activity.useQuery()

	return (
		<div className="bg-neutral-800 w-64 flex-shrink-0 px-4 py-8 space-y-4">
			<p className="uppercase font-semibold text-sm">Streaming Now</p>

			{activity?.streamers.map(({ id, username, avatar, startedAt }) => {
				let minutes = Math.floor(
					(new Date().getTime() - new Date(startedAt).getTime()) / (1000 * 60)
				)

				return (
					<Link href={`/${username}`} className="flex items-center space-x-2">
						{avatar ? (
							<img
								src={`https://files.glaffle.com/avatars/${encodeURIComponent(
									id
								)}/${encodeURIComponent(avatar)}/128.png`}
								alt=""
								className="w-10 h-10 bg-neutral-700 rounded-md"
							/>
						) : (
							<div className="w-10 h-10 bg-emerald-400 rounded-md" />
						)}

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
