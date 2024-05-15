import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Root() {
	return (
		<>
			<div className='h-screen bg-c4 '>
				<Header />
				<Outlet />
			</div>
		</>
	)
}
