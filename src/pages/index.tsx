import { trpc } from "@/lib/trpc"
import { Layout } from "@/components/Layout"
import { Post } from "@/components/Post"

export default function Page() {
	let { data: feed } = trpc.feed.useQuery()

	return (
		<Layout>
			<div className="w-full max-w-2xl mx-auto space-y-4">
				{feed?.posts.map((post) => (
					<Post
						key={post.id}
						username={post.author.username}
						content={post.content}
						date={new Date(post.date)}
					/>
				))}
			</div>
		</Layout>
	)
}
