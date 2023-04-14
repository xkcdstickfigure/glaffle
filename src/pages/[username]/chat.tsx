import { useEffect, useState, useRef, UIEventHandler } from "react"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { BigInput } from "@/components/BigInput"
import { Avatar } from "@/components/Avatar"
import Head from "next/head"
import Link from "next/link"
import clsx from "clsx"
import { usePusher } from "@/lib/pusher"
import { userColor } from "@/lib/userColor"

export default function Page() {
	let router = useRouter()
	let username =
		typeof router.query.username === "string" ? router.query.username : ""

	let { data: channel } = trpc.userGet.useQuery(
		{
			username: username.toLowerCase(),
		},
		{
			refetchInterval: 30000,
		}
	)

	return channel ? (
		<>
			<Head>
				<title>Glaffle | 💬 {username}</title>
			</Head>

			<div className="h-full overflow-auto flex flex-col">
				<div className="p-4 flex items-center justify-between bg-neutral-800 border-b border-neutral-700">
					<div className="flex items-center space-x-2">
						<Avatar
							userId={channel.id}
							avatarId={channel.avatar}
							className="w-10 h-10"
						/>

						<div className="min-w-0">
							<p className="font-medium">{channel.username}</p>
							<p className="text-xs text-neutral-400 truncate">
								{!channel.streamActive
									? "Not streaming"
									: channel.streamTitle ?? "Streaming Now!"}
							</p>
						</div>
					</div>

					<div>
						<p className="text-neutral-400 text-sm text-right">
							<span className="text-white font-semibold">
								{channel.viewerCount}
							</span>{" "}
							{channel.viewerCount === 1 ? "viewer" : "viewers"}
						</p>
					</div>
				</div>

				<StreamChat channelId={channel.id} />
			</div>
		</>
	) : (
		<div className="h-full flex flex-col justify-center text-center space-y-1">
			<p className="text-4xl font-semibold">Glaffle</p>
			<p className="text-neutral-400 text-sm">Loading Chat...</p>
		</div>
	)
}

interface Message {
	id: string
	authorId: string
	authorUsername: string
	content: string
	date: string
}

export const StreamChat = ({ channelId }: { channelId: string }) => {
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
		<div className="bg-neutral-900 flex-grow overflow-auto flex flex-col justify-between">
			<div
				ref={messagesContainer}
				onScroll={onScroll}
				className="space-y-4 text-xs overflow-auto p-4"
			>
				{messages.map((message) => {
					let date = new Date(message.date)

					return (
						<div key={message.id} className="overflow-hidden space-y-0.5">
							<p className="space-x-1">
								<Link
									href={`/${message.authorUsername}`}
									className={clsx("font-semibold", userColor(message.authorId))}
								>
									{message.authorUsername}
								</Link>

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
