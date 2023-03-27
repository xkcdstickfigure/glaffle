import { GetServerSideProps } from "next"
import { generateAuthUrl } from "@/server/google"

export default () => <></>

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: generateAuthUrl(),
			permanent: false,
		},
	}
}
