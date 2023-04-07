import { useEffect, useState, useRef, UIEventHandler } from "react"
import { trpc } from "@/lib/trpc"
import Link from "next/link"
import clsx from "clsx"
import { usePusher } from "@/lib/pusher"
import { BigInput } from "./BigInput"
import { useRouter } from "next/router"

interface Props {
	channelId: string
}

interface Message {
	id: string
	authorId: string
	authorUsername: string
	content: string
	date: string
}

const colors = [
	"text-emerald-400",
	"text-pink-400",
	"text-yellow-400",
	"text-blue-400",
	"text-purple-400",
	"text-rose-400",
	"text-orange-400",
]

export const StreamChat = ({ channelId }: Props) => {
	let { data: profile } = trpc.profile.useQuery()
	let router = useRouter()

	// send message
	let [value, setValue] = useState("")
	let mutation = trpc.streamChatSend.useMutation()

	let onSubmit = async () => {
		let v = value.trim()
		if (v) {
			if (profile) {
				setValue("")
				await mutation.mutateAsync({ content: v, channelId })
			} else router.push("/auth")
		}
	}

	// subscribe to pusher channel
	let pusher = usePusher()
	let [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		if (pusher) {
			let channelName = "stream-chat-" + channelId
			let channel = pusher.subscribe(channelName)

			channel.bind("message-create", ({ message }: { message: Message }) => {
				setMessages((m) => [...m, message])
			})

			let p = pusher
			return () => {
				channel.unbind("message-create")
				p.unsubscribe(channelName)
			}
		}
	}, [pusher, channelId])

	// autoscroll
	let messagesContainer = useRef<HTMLDivElement>(null)
	let [autoScroll, setAutoScroll] = useState(true)

	let onScroll: UIEventHandler<HTMLDivElement> = () => {
		let elem = messagesContainer.current
		if (elem) {
			let scrollBottom =
				elem.scrollHeight - elem.scrollTop - elem.getBoundingClientRect().height
			setAutoScroll(scrollBottom < 24)
		}
	}

	useEffect(() => {
		let elem = messagesContainer.current
		if (elem && autoScroll) {
			elem.scrollTop = elem.scrollHeight
		}
	}, [messagesContainer, autoScroll, messages])

	return (
		<div className="bg-neutral-900 border-l border-neutral-800 w-80 flex-shrink-0 hidden md:flex flex-col justify-between">
			<div
				ref={messagesContainer}
				onScroll={onScroll}
				className="space-y-4 text-sm overflow-auto p-4"
			>
				{messages.map((message) => {
					let date = new Date(message.date)

					return (
						<div key={message.id} className="overflow-hidden space-y-0.5">
							<p>
								<Link
									href={`/${message.authorUsername}`}
									className={clsx(
										"font-semibold",
										colors[
											parseInt(message.authorId.split("-")[0], 16) %
												colors.length
										]
									)}
								>
									{message.authorUsername}
								</Link>{" "}
								<span className="text-neutral-600">
									{date.getHours().toString().padStart(2, "0")}:
									{date.getMinutes().toString().padStart(2, "0")}
								</span>
							</p>

							<p>{message.content}</p>
						</div>
					)
				})}
			</div>

			<div className="p-4">
				<BigInput
					placeholder="Send a message"
					value={value}
					onChange={(e) => setValue(e.target.value.trimStart())}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	)
}
