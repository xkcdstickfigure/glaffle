import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { SidebarStreamer } from "./SidebarStreamer"

export const Sidebar = () => {
	let { data: profile, isLoading: profileLoading } = trpc.profile.useQuery()
	let { data: activity } = trpc.activity.useQuery()

	return (
		<div className="bg-neutral-800 w-64 flex-shrink-0 flex flex-col justify-between">
			<div className="space-y-8">
				<Link
					href="/"
					className="flex space-x-2 justify-center items-center mt-8"
				>
					<div className="w-8 h-8 rounded-md bg-emerald-400" />
					<p className="text-3xl font-semibold">Glaffle</p>
				</Link>

				{activity && activity.streamers.length > 0 && (
					<div className="px-4 space-y-2">
						<p className="uppercase font-semibold text-sm">Streaming Now</p>
						<div className="space-y-4">
							{activity.streamers.map((streamer) => (
								<SidebarStreamer key={streamer.id} {...streamer} />
							))}
						</div>
					</div>
				)}
			</div>

			{!profileLoading &&
				(profile ? (
					<div className="flex items-center space-x-2 p-4">
						{profile.avatar ? (
							<img
								src={`https://files.glaffle.com/avatars/${encodeURIComponent(
									profile.id
								)}/${encodeURIComponent(profile.avatar)}/128.png`}
								alt=""
								className="w-8 h-8 bg-neutral-700 rounded-md"
							/>
						) : (
							<div className="w-8 h-8 bg-emerald-400 rounded-md" />
						)}

						<p className="text-lg">{profile.username}</p>
					</div>
				) : (
					<div className="bg-neutral-700 rounded-md m-2 p-4 space-y-4">
						<div className="space-y-1">
							<p className="text-lg font-medium">Find Your People</p>
							<p className="text-xs text-neutral-400">
								Join the community with a Glaffle account - no password needed.
							</p>
						</div>

						<Link
							href="/auth"
							className="block py-1 text-center rounded-md bg-emerald-600 text-white"
						>
							Sign in with Google
						</Link>
					</div>
				))}
		</div>
	)
}
