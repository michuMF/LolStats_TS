import { useContext } from "react"
import { SummonerContext } from "./summonerContext"

export function useSummonerContext() {
	const context = useContext(SummonerContext)

	if (context === undefined) {
		throw new Error(
			"useSummonerContext must be used within a SummonerContextProvider"
		)
	}
	return context
}
