import { DetailedHTMLProps, TextareaHTMLAttributes } from "react"

interface Props
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	onSubmit?: () => any
}

export const BigInput = ({ onSubmit, ...props }: Props) => {
	let keyPress = async (key: string) => {
		if (key === "Enter") {
			if (onSubmit) onSubmit()
		}
	}

	return (
		<textarea
			onKeyDown={(e) => keyPress(e.key)}
			className="bg-neutral-800 placeholder-neutral-600 text-sm rounded-md w-full h-16 resize-none p-2 border border-neutral-700"
			{...props}
		/>
	)
}
