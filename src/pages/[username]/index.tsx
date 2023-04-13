import { useEffect } from "react"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/layout/Layout"
import { Stream } from "@/components/Stream"
import { StreamChat } from "@/components/StreamChat"
import { Avatar } from "@/components/Avatar"
import Link from "next/link"

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
						<div className="flex-grow overflow-auto">
							<div className="w-full bg-neutral-900">
								<Stream id={user.id} />
							</div>

							<div className="p-8">
								<div className="flex justify-between">
									<div className="flex items-center space-x-4">
										<Avatar
											userId={user.id}
											avatarId={user.avatar}
											className="w-20 h-20"
										/>

										<div>
											<h1 className="text-2xl font-semibold">
												{user.username}
											</h1>

											<h2 className="text-neutral-400 font-light">
												{user.streamTitle ?? "Streaming Now!"}
											</h2>
										</div>
									</div>

									<div className="space-y-2 flex-shrink-0">
										<p className="text-neutral-400 text-sm text-right">
											<span className="text-white font-semibold">
												{user.viewerCount}
											</span>{" "}
											{user.viewerCount === 1 ? "viewer" : "viewers"}
										</p>

										<div className="flex justify-end space-x-1">
											{user.viewers.map((viewer) => (
												<Link key={viewer.id} href={`/${viewer.username}`}>
													<Avatar
														userId={viewer.id}
														avatarId={viewer.avatar}
														className="w-8 h-8"
													/>
												</Link>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						<StreamChat key={`stream-chat-${user.id}`} channelId={user.id} />
					</div>
				) : (
					<p>{user.username} is not streaming</p>
				))}
		</Layout>
	)
}
