import { trpc } from "@/lib/trpc"

export default function Page() {
	let { data: user } = trpc.userGet.useQuery({ username: "sfig" })

	return <pre>{JSON.stringify(user, undefined, "	")}</pre>
}
