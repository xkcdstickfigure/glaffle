import { trpc } from "@/lib/trpc"
import { Layout } from "@/components/Layout"
import { Post } from "@/components/Post"
import { CreatePost } from "@/components/CreatePost"

export default function Page() {
	let { data: feed, refetch: feedRefetch } = trpc.feed.useQuery()

	return (
		<Layout>
			<div className="w-full max-w-2xl mx-auto space-y-4">
				<CreatePost onCreate={() => feedRefetch()} />

				{feed?.posts.map((post) => (
					<Post
						key={post.id}
						authorId={post.author.id}
						authorUsername={post.author.username}
						authorAvatar={post.author.avatar}
						content={post.content}
						date={new Date(post.date)}
					/>
				))}
			</div>
		</Layout>
	)
}
