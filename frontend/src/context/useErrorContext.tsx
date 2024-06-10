import { useContext } from "react"
import { ErrorContext } from "./errorContext"

export function useErrorContext() {
	const context = useContext(ErrorContext)

	if (context === undefined) {
		throw new Error(
			"useSummonerContext must be used within a SummonerContextProvider"
		)
	}
	return context
}
