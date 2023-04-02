import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/components/Layout"
import { Stream } from "@/components/Stream"
import { StreamChat } from "@/components/StreamChat"

export default function Page() {
	let router = useRouter()
	let username =
		typeof router.query.username === "string" ? router.query.username : ""

	let { data: user } = trpc.userGet.useQuery({
		username: username.toLowerCase(),
	})

	return (
		<Layout title={user?.username}>
			{user &&
				(user.streamActive ? (
					<div className="flex h-full">
						<div className="flex-grow">
							<div className="w-full bg-neutral-900">
								<Stream id={user.id} />
							</div>
						</div>

						<StreamChat />
					</div>
				) : (
					<p>{user.username} is not streaming</p>
				))}
		</Layout>
	)
}
