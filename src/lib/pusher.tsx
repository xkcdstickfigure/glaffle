import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import Pusher from "pusher-js"

interface Props {
	children: ReactNode
}

const Context = createContext<Pusher | null>(null)

export const PusherProvider = ({ children }: Props) => {
	let [connection, setConnection] = useState<Pusher>()

	useEffect(() => {
		let pusher = new Pusher("f13d4e5033995207bfc3", {
			cluster: "eu",
		})

		setConnection(pusher)

		return () => pusher.disconnect()
	}, [])

	return <Context.Provider value={connection ?? null} children={children} />
}

export const usePusher = () => useContext(Context)
