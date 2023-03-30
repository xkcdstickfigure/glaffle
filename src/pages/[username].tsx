import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/components/Layout"
import { Stream } from "@/components/Stream"

export default function Page() {
	let router = useRouter()
	let { username } = router.query

	let { data: user } = trpc.userGet.useQuery({
		username: typeof username === "string" ? username : "",
	})

	return (
		<Layout title={user?.username && "@" + user.username}>
			{user && (
				<div className="space-y-4">
					<p>
						{user.username} is{" "}
						{user.streamActive ? "streaming!" : "not streaming"}
					</p>

					{user.streamActive && <Stream id={user.id} />}
				</div>
			)}
		</Layout>
	)
}
