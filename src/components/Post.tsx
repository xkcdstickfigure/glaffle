import Link from "next/link"
import { Avatar } from "./Avatar"

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
	<Link
		href={`/p/${id}`}
		className="block bg-neutral-900 border border-neutral-800 p-4 rounded-md relative"
	>
		<div className="space-y-2">
			<div className="flex items-center space-x-2">
				<Avatar userId={authorId} avatarId={authorAvatar} className="w-8 h-8" />
				<p className="font-medium text-lg">{authorUsername}</p>
			</div>

			<p className="text-sm">{content}</p>

			<p className="text-xs text-neutral-400">
				{date.toLocaleString(undefined, {
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
				})}
			</p>
		</div>

		{replyCount !== 0 && (
			<div className="absolute bottom-3 right-3 bg-neutral-800 border border-neutral-700 rounded-md py-1 px-2">
				<p className="text-neutral-400 text-xs text-right">
					<span className="text-white">{replyCount}</span>{" "}
					{replyCount === 1 ? "reply" : "replies"}
				</p>
			</div>
		)}
	</Link>
)
