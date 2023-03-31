import Link from "next/link"

interface Props {
	id: string
	username: string
	avatar: string | null
	startedAt: string
}

export const SidebarStreamer = ({ id, username, avatar, startedAt }: Props) => {
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
				<p className="text-lg">{username}</p>
				<p className="text-xs text-neutral-400">
					{minutes > 1 ? `Started ${minutes} minutes ago` : "Started just now"}
				</p>
			</div>
		</Link>
	)
}
