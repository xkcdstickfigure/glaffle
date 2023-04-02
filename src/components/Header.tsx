import { trpc } from "@/lib/trpc"
import Link from "next/link"

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
					<Link
						href={`/${profile.username}`}
						className="flex items-center space-x-2"
					>
						<p className="font-medium text-lg">{profile.username}</p>

						{profile.avatar ? (
							<img
								src={`https://files.glaffle.com/avatars/${encodeURIComponent(
									profile.id
								)}/${encodeURIComponent(profile.avatar)}/128.png`}
								alt=""
								className="w-8 h-8 bg-neutral-700 rounded-md"
							/>
						) : (
							<div className="w-8 h-8 bg-emerald-400 rounded-md" />
						)}
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
