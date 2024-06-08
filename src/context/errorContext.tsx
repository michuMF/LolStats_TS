import { errorContextProps, summonerContextProviderProps } from "@/types/types"
import { createContext, useState } from "react"

export const ErrorContext = createContext<errorContextProps | undefined>(
	undefined
)

export default function ErrorContextProvider({
	children,
}: summonerContextProviderProps) {
	const [error, setError] = useState<boolean>(false)

	return (
		<ErrorContext.Provider value={{ error, setError }}>
			{children}
		</ErrorContext.Provider>
	)
}
