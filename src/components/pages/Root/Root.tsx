import { Outlet } from "react-router-dom"
import Header from "./Header"
// import background from "../../../assets/background.webp"

export default function Root() {
	return (
		<>
			<div className='min-h-screen    '>
				<Header />
				<Outlet />
			</div>
		</>
	)
}
