import { Layout } from "@/layout/Layout"
import { Post } from "@/components/Post"
import { PostCreate } from "@/components/PostCreate"
import { trpc } from "@/lib/trpc"

export default function Page() {
	let { data: feed } = trpc.feed.useQuery()

	return (
		<Layout>
			<div className="p-8 max-w-xl space-y-4">
				<PostCreate />

				{feed?.posts.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						authorId={post.author.id}
						authorUsername={post.author.username}
						authorAvatar={post.author.avatar}
						content={post.content}
						date={new Date(post.date)}
						replyCount={post.replyCount}
					/>
				))}
			</div>
		</Layout>
	)
}
