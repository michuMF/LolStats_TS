import {
	fetchDataFromMatch,
	fetchMatches,
	fetchSummonerById,
	fetchSummonerByPuuid,
} from "./fetchDatas/FetchDatas"

type summonerType = {
	gameName: string
	gameTag: string
	defaultGameTag: string
}

export const fetchSummoner = async (name: summonerType, region: string) => {
	let data2
	let ranking
	let gameTag
	name.gameTag ? (gameTag = name.gameTag) : (gameTag = name.defaultGameTag)
	try {
		const res = await fetch(
			`http://localhost:8800/summoners/${name.gameName}/${gameTag}`
		)
		const data = await res.json()

		data2 = await fetchSummonerByPuuid(data.puuid, region)
		const matchArray = await fetchMatches(data.puuid)

		const dataFromMatches = await fetchDataFromMatch(matchArray, name.gameName)

		ranking = await fetchSummonerById(data2.id, region)

		const mergeData = {
			...data,
			...data2,
			ranking: ranking,
			matchArray: dataFromMatches,
		}

		return mergeData
	} catch (error) {
		return false
	}
}
