import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useState } from "react"

export type ContextValueProps = {
	isLoading: boolean
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Root() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const contextValue: ContextValueProps = {
		isLoading,
		setIsLoading,
	}
	return (
		<>
			<div className='min-h-screen bg-c-1  bg-opacity-10   '>
				<Header />
				<Outlet context={contextValue} />
			</div>
		</>
	)
}
