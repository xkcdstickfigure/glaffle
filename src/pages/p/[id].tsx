import { useState, FormEventHandler } from "react"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { Layout } from "@/layout/Layout"
import { Avatar } from "@/components/Avatar"
import Link from "next/link"
import { Input } from "@/components/Input"

export default function Page() {
	let router = useRouter()
	let id = typeof router.query.id === "string" ? router.query.id : ""
	let { data: post } = trpc.postGet.useQuery({ id })

	return (
		<Layout
			title={
				post
					? `${post.author.username}: ${post.content.split("\n")[0]}`
					: undefined
			}
		>
			{post && (
				<div className="p-8 max-w-xl space-y-4">
					<div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-4">
						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<Link href={`/${post.author.username}`}>
									<Avatar
										userId={post.author.id}
										avatarId={post.author.avatar}
										className="w-8 h-8"
									/>
								</Link>

								<p className="font-medium text-lg">
									<Link href={`/${post.author.username}`}>
										{post.author.username}
									</Link>
								</p>
							</div>

							<p className="text-sm whitespace-pre-wrap">{post.content}</p>

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

						<ReplyCreate postId={post.id} />
					</div>

					{post.replies.length > 0 && (
						<div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-2">
							<p className="font-semibold">Replies</p>

							<div className="space-y-4">
								{post.replies.map((reply) => (
									<div key={reply.id}>
										<div className="flex items-center space-x-2">
											<Link
												href={`/${reply.author.username}`}
												className="flex-shrink-0"
											>
												<Avatar
													userId={reply.author.id}
													avatarId={reply.author.avatar}
													className="w-8 h-8"
												/>
											</Link>

											<div>
												<p className="space-x-1">
													<Link
														href={`/${reply.author.username}`}
														className="text-lg font-medium"
													>
														{reply.author.username}
													</Link>

													<span className="text-neutral-400 text-xs">
														{new Date(reply.date).toLocaleString(undefined, {
															month: "short",
															day: "numeric",
															year: "numeric",
															hour: "numeric",
															minute: "numeric",
														})}
													</span>
												</p>

												<p className="text-xs">{reply.content}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</Layout>
	)
}

export const ReplyCreate = ({ postId }: { postId: string }) => {
	let { refetch: postRefetch } = trpc.postGet.useQuery({ id: postId })
	let [value, setValue] = useState("")
	let [loading, setLoading] = useState(false)
	let mutation = trpc.postReplyCreate.useMutation()

	let onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		if (loading) return
		setLoading(true)

		await mutation.mutateAsync({ content: value, postId: postId })
		await postRefetch()

		setValue("")
		setLoading(false)
	}

	return (
		<form onSubmit={onSubmit}>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Reply...."
				maxLength={512}
			/>
		</form>
	)
}
