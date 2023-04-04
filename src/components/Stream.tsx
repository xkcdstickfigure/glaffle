import { useEffect, useRef } from "react"
import Hls from "hls.js"

interface Props {
	id: string
}

export const Stream = ({ id }: Props) => {
	const ref = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (ref.current) {
			let hls = new Hls()
			hls.loadSource(
				"https://stream-de1.glaffle.com/hls/" +
					encodeURIComponent(id) +
					"/index.m3u8"
			)
			hls.attachMedia(ref.current)
			return () => hls.destroy()
		}
	}, [id, ref])

	return <video ref={ref} autoPlay controls className="w-full" />
}
