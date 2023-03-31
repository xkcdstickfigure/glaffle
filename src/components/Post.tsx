import Link from "next/link"

interface Props {
	id: string
	authorId: string
	authorUsername: string
	authorAvatar: string | null
	content: string
	date: Date
	replyCount: number
}

export const Post = ({
	id,
	authorId,
	authorUsername,
	authorAvatar,
	content,
	date,
	replyCount,
}: Props) => (
	<div className="bg-neutral-800 rounded-md p-4 relative">
		<div className="space-y-2">
			<div className="flex space-x-2 items-center">
				<Link href={`/${authorUsername}`}>
					{authorAvatar ? (
						<img
							src={`https://files.glaffle.com/avatars/${encodeURIComponent(
								authorId
							)}/${encodeURIComponent(authorAvatar)}/128.png`}
							alt=""
							className="w-8 h-8 bg-neutral-700 rounded-md"
						/>
					) : (
						<div className="w-8 h-8 bg-emerald-400 rounded-md" />
					)}
				</Link>

				<Link href={`/${authorUsername}`} className="text-lg">
					{authorUsername}
				</Link>
			</div>

			<p className="whitespace-pre-wrap">{content}</p>

			<p className="text-neutral-400 text-xs">
				{date.toLocaleString(undefined, {
					dateStyle: "medium",
					timeStyle: "short",
				})}
			</p>
		</div>

		<Link
			href={`/${authorUsername}/posts/${id}`}
			className="absolute bottom-3 right-3 text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded-md"
		>
			{replyCount} {replyCount === 1 ? "reply" : "replies"}
		</Link>
	</div>
)
