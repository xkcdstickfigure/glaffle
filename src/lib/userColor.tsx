// this is a .tsx file just so the tailwind color classes don't get purged

const colors = [
	"text-emerald-400",
	"text-pink-400",
	"text-yellow-400",
	"text-blue-400",
	"text-purple-400",
	"text-rose-400",
	"text-orange-400",
]

export const userColor = (id: string) =>
	colors[parseInt(id.split("-")[0], 16) % colors.length]
