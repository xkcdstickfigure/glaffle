import Link from "next/link"

interface Props {
	authorId: string
	authorUsername: string
	authorAvatar: string | null
	content: string
	date: Date
}

export const Post = ({
	authorId,
	authorUsername,
	authorAvatar,
	content,
	date,
}: Props) => (
	<div className="bg-neutral-800 rounded-md p-4 space-y-2">
		<div className="flex space-x-2 items-center">
			<Link href={`/${authorUsername}`}>
				{authorAvatar ? (
					<img
						src={`https://files.glaffle.com/avatars/${encodeURIComponent(
							authorId
						)}/${encodeURIComponent(authorAvatar)}/128.png`}
						alt=""
						className="w-7 h-7 bg-neutral-700 rounded-md"
					/>
				) : (
					<div className="w-7 h-7 bg-emerald-400 rounded-md" />
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
)
