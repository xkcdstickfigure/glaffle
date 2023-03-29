import { trpc } from "@/lib/trpc"
import { Layout } from "@/components/Layout"

export default function Page() {
	let { data: profile } = trpc.profile.useQuery()

	return (
		<Layout>
			<pre>{JSON.stringify(profile, undefined, "	")}</pre>
		</Layout>
	)
}
