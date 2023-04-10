import { useState, FormEventHandler } from "react"
import { Layout } from "@/layout/Layout"
import { Input } from "@/components/Input"
import { trpc } from "@/lib/trpc"

export default function Page() {
	return (
		<Layout title="Settings">
			<div className="p-8 max-w-lg space-y-4">
				<h1 className="font-semibold text-4xl">Settings</h1>
				<ProfileCard />
				<StreamConfigCard />
			</div>
		</Layout>
	)
}

export const ProfileCard = () => {
	let { data: profile, refetch: profileRefetch } = trpc.profile.useQuery()
	let [username, setUsername] = useState("")
	let [description, setDescription] = useState<string>()
	let mutation = trpc.profileUpdate.useMutation()

	let onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		await mutation.mutateAsync({
			username,
			description:
				description !== undefined ? description : profile?.description || "",
		})
		profileRefetch()
	}

	return profile ? (
		<form
			onSubmit={onSubmit}
			className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-4"
		>
			<p className="font-semibold text-lg">Profile</p>

			<div className="space-y-2">
				<p className="font-medium text-sm">Username</p>
				<Input
					defaultValue={profile.username}
					onChange={(e) => setUsername(e.target.value.trim())}
					placeholder={profile.username}
				/>
			</div>

			<div className="space-y-2">
				<p className="font-medium text-sm">About</p>
				<Input
					defaultValue={profile.description ?? ""}
					onChange={(e) => setDescription(e.target.value.trim())}
					placeholder="Tell us a bit about yourself"
				/>
			</div>

			<div className="flex justify-end">
				<button className="bg-pink-600 py-1 px-4 rounded-md">Save</button>
			</div>
		</form>
	) : (
		<></>
	)
}

export const StreamConfigCard = () => {
	let { data: profile } = trpc.profile.useQuery()
	let [secret, setSecret] = useState("•".repeat(32))
	let mutation = trpc.streamSecretReset.useMutation({
		onSuccess: (data) => {
			if (data) setSecret(data)
		},
	})

	return profile ? (
		<div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-4">
			<p className="font-semibold text-lg">Stream Config</p>

			<div className="space-y-2">
				<p className="font-medium text-sm">Server</p>
				<Input value="rtmps://stream-de1.glaffle.com:1935/live" readOnly />
			</div>

			<div className="space-y-2">
				<p className="font-medium text-sm">Stream Key</p>
				<Input value={secret} readOnly />
			</div>

			<div className="flex justify-end">
				<button
					onClick={() => mutation.mutate()}
					className="bg-pink-600 py-1 px-4 rounded-md"
				>
					Reset
				</button>
			</div>
		</div>
	) : (
		<></>
	)
}
