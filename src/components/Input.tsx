import { DetailedHTMLProps, InputHTMLAttributes } from "react"

export const Input = (
	props: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
) => (
	<input
		className="bg-neutral-800 border border-neutral-700 placeholder-neutral-600 focus:border-neutral-400 outline-none text-sm rounded-md w-full p-2"
		{...props}
	/>
)
