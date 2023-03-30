import { useState, useRef, FormEvent } from "react"
import { trpc } from "@/lib/trpc"
import { clsx } from "clsx"

export const CreatePost = ({ onCreate }: { onCreate: () => any }) => {
	let [content, setContent] = useState("")
	let [loading, setLoading] = useState(false)
	let mutation = trpc.postCreate.useMutation()
	let textarea = useRef<HTMLTextAreaElement>(null)

	let submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		await mutation.mutateAsync({ content })
		await onCreate()
		if (textarea.current) textarea.current.value = ""
		setContent("")
		setLoading(false)
	}

	return (
		<form
			onSubmit={submit}
			className="bg-neutral-800 rounded-md overflow-hidden"
		>
			<textarea
				ref={textarea}
				placeholder="What's up?"
				autoFocus={true}
				onChange={(e) => setContent(e.target.value.trim())}
				className="w-full bg-transparent resize-none outline-none placeholder-neutral-600 p-4 h-32"
			/>

			<div className="p-4 flex justify-end">
				<button
					disabled={!content || loading}
					className={clsx(
						"py-0.5 w-24 rounded-md",
						content && !loading
							? "bg-emerald-600 text-white"
							: "bg-neutral-700 text-neutral-400"
					)}
				>
					{loading ? "Posting..." : "Post"}
				</button>
			</div>
		</form>
	)
}
