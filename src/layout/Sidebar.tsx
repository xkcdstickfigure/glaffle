import { useState } from "react"
import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { Avatar } from "@/components/Avatar"
import { BigInput } from "@/components/BigInput"

export const Sidebar = () => {
	let { data: profile } = trpc.profile.useQuery()
	let { data: activity } = trpc.activity.useQuery(undefined, {
		refetchInterval: 10000,
	})

	return (
		<div className="bg-neutral-900 border-r border-neutral-800 w-64 flex-shrink-0 hidden lg:flex flex-col justify-between">
			<div className="p-4 space-y-4">
				<p className="uppercase font-semibold text-sm">Streaming Now</p>

				{activity?.streamers.map(({ id, username, avatar, title }) => (
					<Link
						key={id}
						href={`/${username}`}
						className="flex items-center space-x-2"
					>
						<Avatar userId={id} avatarId={avatar} className="w-10 h-10" />

						<div className="min-w-0">
							<p className="font-medium">{username}</p>
							<p className="text-xs text-neutral-400 truncate">{title}</p>
						</div>
					</Link>
				))}
			</div>

			{profile?.streamActive &&
				(profile.streamPublished ? (
					<Link
						href={`/${profile.username}`}
						className="border border-neutral-700 m-2 rounded-md p-4 flex items-center space-x-2"
					>
						<div className="bg-pink-600 rounded-full w-4 h-4" />
						<p className="font-bold">You're Live!</p>
					</Link>
				) : (
					<PublishStream />
				))}
		</div>
	)
}

const PublishStream = () => {
	let { refetch } = trpc.profile.useQuery()
	let [value, setValue] = useState("")
	let [loading, setLoading] = useState(false)
	let mutation = trpc.streamPublish.useMutation()

	let onSubmit = async () => {
		setLoading(true)
		let data = await mutation.mutateAsync({ title: value.trim() })
		if (data) refetch()
		else {
			setValue("")
			setLoading(false)
		}
	}

	return (
		<div className="border border-neutral-700 m-2 rounded-md p-4 space-y-4">
			<div className="space-y-0.5">
				<div className="flex items-center space-x-2">
					<div className="bg-pink-600 rounded-full w-4 h-4" />
					<p className="font-bold">Publish Stream</p>
				</div>

				<p className="text-neutral-400 text-xs">
					Your stream is live on your profile, but it's not discoverable yet.
				</p>
			</div>

			<BigInput
				placeholder="Enter a short description"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={loading}
				onSubmit={onSubmit}
				maxLength={72}
			/>
		</div>
	)
}
