import { useState } from "react"
import clsx from "clsx"
import { trpc } from "@/lib/trpc"

interface Props {
	channel: string
}

export const StreamChat = ({ channel }: Props) => {
	let [value, setValue] = useState("")
	let [sending, setSending] = useState(false)
	let mutation = trpc.streamChatSend.useMutation()

	let keyPress = async (key: string) => {
		if (key === "Enter") {
			let v = value.trim()
			if (v) {
				setSending(true)
				await mutation.mutateAsync({ content: v, channel })
				setSending(false)
				setValue("")
			}
		}
	}

	return (
		<div className="bg-neutral-900 border-l border-neutral-800 w-80 flex-shrink-0 p-4 flex flex-col justify-between">
			<div className="space-y-2 text-xs">
				<p>
					<span className="font-medium text-pink-400">ExampleUser</span> Hello
				</p>
				<p>
					<span className="font-medium text-emerald-400">ExampleUser2</span>{" "}
					This is a test
				</p>
			</div>

			<div>
				<textarea
					placeholder="Send a message"
					value={value}
					onChange={(e) => setValue(e.target.value.trimStart())}
					disabled={sending}
					onKeyDown={(e) => keyPress(e.key)}
					className={clsx(
						"bg-neutral-800 placeholder-neutral-600 text-sm rounded-md w-full h-16 resize-none p-2 border border-neutral-700",
						sending && "text-neutral-400"
					)}
				/>
			</div>
		</div>
	)
}
