import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/components/Layout"
import { Stream } from "@/components/Stream"
import { StreamChat } from "@/components/StreamChat"
import { useEffect } from "react"

export default function Page() {
	let router = useRouter()
	let username =
		typeof router.query.username === "string" ? router.query.username : ""

	let { data: user } = trpc.userGet.useQuery(
		{
			username: username.toLowerCase(),
		},
		{
			refetchInterval: 30000,
		}
	)

	// stream view
	let viewMutation = trpc.streamView.useMutation()
	useEffect(() => {
		if (user) {
			let id = user.id
			let interval = setInterval(() => {
				viewMutation.mutate({ channelId: id })
			}, 20000)
			return () => clearInterval(interval)
		}
	}, [user?.id])

	return (
		<Layout title={user?.username}>
			{user &&
				(user.streamActive ? (
					<div className="flex h-full">
						<div className="flex-grow">
							<div className="w-full bg-neutral-900">
								<Stream id={user.id} />
							</div>

							<p>
								{user.viewerCount}{" "}
								{user.viewerCount === 1 ? "viewer" : "viewers"}
							</p>
							{user.viewers.map((viewer) => (
								<p key={viewer.id}>{viewer.username}</p>
							))}
						</div>

						<StreamChat
							key={`stream-chat-${user.id}`}
							pusherKey={user.pusherKey}
							channelId={user.id}
						/>
					</div>
				) : (
					<p>{user.username} is not streaming</p>
				))}
		</Layout>
	)
}
