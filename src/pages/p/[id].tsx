import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/layout/Layout"
import { Avatar } from "@/components/Avatar"

export default function Page() {
	let router = useRouter()
	let id = typeof router.query.id === "string" ? router.query.id : ""
	let { data: post } = trpc.postGet.useQuery({ id })

	return (
		<Layout>
			<div className="p-8 max-w-xl space-y-4">
				{post && (
					<div className="block bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-2">
						<div className="flex items-center space-x-2">
							<Avatar
								userId={post.author.id}
								avatarId={post.author.avatar}
								className="w-8 h-8"
							/>
							<p className="font-medium text-lg">{post.author.username}</p>
						</div>

						<p className="text-sm">{post.content}</p>

						<p className="text-xs text-neutral-400">
							{new Date(post.date).toLocaleString(undefined, {
								month: "short",
								day: "numeric",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
						</p>
					</div>
				)}
			</div>
		</Layout>
	)
}
