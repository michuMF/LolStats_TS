import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Root() {
	return (
		<>
			<div className='min-h-screen bg-c1 '>
				<Header />
				<Outlet />
			</div>
		</>
	)
}
