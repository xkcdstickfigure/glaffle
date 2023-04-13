import { useState, KeyboardEventHandler } from "react"
import clsx from "clsx"
import { trpc } from "@/lib/trpc"

export const PostCreate = () => {
	let [value, setValue] = useState("")
	let [loading, setLoading] = useState(false)
	let mutation = trpc.postCreate.useMutation()
	let { refetch: feedRefetch } = trpc.feed.useQuery()

	let submit = async () => {
		if (loading) return
		setLoading(true)
		await mutation.mutateAsync({ content: value })
		await feedRefetch()
		setValue("")
		setLoading(false)
	}

	let onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
		if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) submit()
	}

	return (
		<div className="bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden">
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={onKeyDown}
				placeholder="Say something..."
				maxLength={512}
				className={
					"bg-transparent placeholder-neutral-600 outline-none text-sm w-full resize-none p-4 h-20"
				}
			/>

			<div className="flex justify-between items-center p-4 pb-3">
				<div>
					{value && (
						<p className="text-xs text-neutral-400">
							<span className="text-white">{value.length}</span> / 512
						</p>
					)}
				</div>

				<button
					onClick={submit}
					disabled={loading}
					className={clsx(
						"text-xs px-4 py-1 rounded-md border",
						loading
							? "bg-neutral-800 border-neutral-700 text-neutral-400"
							: "bg-pink-600 border-pink-600 text-white"
					)}
				>
					{loading ? "Posting..." : "Post"}
				</button>
			</div>
		</div>
	)
}
