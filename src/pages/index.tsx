import { trpc } from "@/lib/trpc"

export default function Page() {
	let hello = trpc.hello.useQuery({ text: "archie" })

	return (
		<p className="text-blue-500">
			{JSON.stringify({ greeting: hello.data?.greeting ?? null })}
		</p>
	)
}
