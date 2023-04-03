import clsx from "clsx"

interface Props {
	userId: string
	avatarId: string | null
	className?: string
}

export const Avatar = ({ userId, avatarId, className }: Props) =>
	avatarId ? (
		<img
			src={`https://files.glaffle.com/avatars/${encodeURIComponent(
				userId
			)}/${encodeURIComponent(avatarId)}/128.png`}
			alt=""
			className={clsx(
				"bg-neutral-700 rounded-md shadow-md border border-neutral-800",
				className
			)}
		/>
	) : (
		<div className={clsx("bg-emerald-400 rounded-md", className)} />
	)
