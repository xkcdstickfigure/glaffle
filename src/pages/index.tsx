import { trpc } from "@/lib/trpc"

export default function Page() {
	let { data: profile } = trpc.profile.useQuery()

	return <pre>{JSON.stringify(profile, undefined, "	")}</pre>
}
