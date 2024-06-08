import {
	summonerContextProps,
	summonerContextProviderProps,
	summonerDataProps,
} from "@/types/types"
import { createContext, useState } from "react"

export const SummonerContext = createContext<summonerContextProps | undefined>(
	undefined
)

export default function SummonerContextProvider({
	children,
}: summonerContextProviderProps) {
	const [summonerData, setSummonerData] = useState<
		summonerDataProps | undefined
	>(undefined)

	return (
		<SummonerContext.Provider value={{ setSummonerData, summonerData }}>
			{children}
		</SummonerContext.Provider>
	)
}
