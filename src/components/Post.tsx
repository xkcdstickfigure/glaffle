import Link from "next/link"

interface Props {
	username: string
	content: string
	date: Date
}

export const Post = ({ username, content, date }: Props) => (
	<div className="bg-neutral-800 rounded-md p-4 space-y-2">
		<div className="flex space-x-2 items-center">
			<Link href={`/${username}`}>
				<div className="w-7 h-7 bg-emerald-400 rounded-md" />
			</Link>
			<Link href={`/${username}`}>{username}</Link>
		</div>

		<p className="whitespace-pre-wrap">{content}</p>

		<p className="text-neutral-400 text-sm">
			{date.toLocaleString(undefined, {
				dateStyle: "medium",
				timeStyle: "short",
			})}
		</p>
	</div>
)
