import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { Avatar } from "@/components/Avatar"

export const Header = () => {
	let { data: profile, isLoading: profileLoading } = trpc.profile.useQuery()

	return (
		<header className="bg-neutral-800 p-4 flex justify-between items-center flex-shrink-0">
			<Link href="/" className="flex items-center space-x-2">
				<div className="w-8 h-8 bg-pink-600 rounded-md" />
				<p className="font-semibold text-2xl">Glaffle</p>
			</Link>

			{!profileLoading &&
				(profile ? (
					<Link href="/settings" className="flex items-center space-x-2">
						<p className="font-medium text-lg">{profile.username}</p>

						<Avatar
							userId={profile.id}
							avatarId={profile.avatar}
							className="w-8 h-8"
						/>
					</Link>
				) : (
					<div className="flex items-center space-x-6">
						<Link href="/auth" className="font-medium">
							Log in
						</Link>

						<Link
							href="/auth"
							className="block bg-pink-600 text-white font-medium px-3 py-1 rounded-md"
						>
							Sign up
						</Link>
					</div>
				))}
		</header>
	)
}
