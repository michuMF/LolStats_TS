import { ChallengersArray } from "@/types/types"
import {} from "./fetchDatas/FetchDatas"

export const fetchRanking = async (): Promise<
	ChallengersArray[] | undefined
> => {
	try {
		const res = await fetch(
			"https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c"
		)

		const data: { entries: ChallengersArray[] } = await res.json()

		const sortedData = data.entries.sort(
			(a, b) => b.leaguePoints - a.leaguePoints
		)

		const test = sortedData.splice(0, 5)

		console.log(test)

		const data2 = await fetchEncryptedSummonerId(test[0].summonerId)

		await fetchSummonerByEncryptedPuuid(data2.puuid)
		console.log(data2)

		return
	} catch (error) {
		console.log(error)
	}
}

export const fetchEncryptedSummonerId = async (summonerId: string) => {
	try {
		const res = await fetch(
			`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()

		return data
	} catch (error) {
		console.log({ error })
	}
}

const fetchSummonerByEncryptedPuuid = async (puuid: string | undefined) => {
	try {
		const res = await fetch(
			`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/LFgE_aIt-_WS0seKnt1uZMjtK7olPtxAoKStlkfTC9RxSYK0EXEI9CUdcEhg8BgSS4vaMumUlmMfcw?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`,
			{}
		)
		const data = await res.json()
		console.log(data)

		return data
	} catch (error) {
		console.log(error)
	}
}
