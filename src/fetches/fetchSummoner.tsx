import { champion, championDetails } from "@/interfaces/interfaces"
import { fetchAllChampion } from "./fetchChampions"

type summonerType = {
	gameName: string
	gameTag: string
	defaultGameTag: string
}

export const fetchSummoner = async (name: summonerType, region: string) => {
	let data2
	let ranking
	let championMastery: champion[]
	let allChampions: championDetails[] | undefined

	let gameTag
	let dataFromMatches

	name.gameTag ? (gameTag = name.gameTag) : (gameTag = name.defaultGameTag)
	try {
		const res = await fetch(
			`http://localhost:8800/summoners/${name.gameName}/${gameTag}`
		)
		const data = await res.json()
		console.log(data)

		if (data) {
			data2 = await fetchSummonerByPuuid(data.puuid, region)
			const matchArray = await fetchMatches(data.puuid)

			dataFromMatches = await fetchDataFromMatch(matchArray)

			if (data2) {
				championMastery = await fetchChampionMastery(data2.puuid, region)

				championMastery = championMastery.slice(0, 3)

				allChampions = await fetchAllChampion(championMastery)
				ranking = await fetchSummonerById(data2.id, region)

				ranking = ranking[0]
			}
		}

		const mergeData = {
			...data,
			...data2,
			...ranking,
			threeChampions: allChampions,
			matchArray: dataFromMatches,
		}

		return mergeData
	} catch (error) {
		console.log({ error })
	}
}

export const fetchSummonerByPuuid = async (
	puuid: string | undefined,
	region: string
) => {
	try {
		const res = await fetch(
			`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

const fetchSummonerById = async (id: string | undefined, region: string) => {
	try {
		const res = await fetch(
			`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

export const fetchChampionMastery = async (
	puuid: string | undefined,
	region: string
) => {
	try {
		const res = await fetch(
			`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

const fetchMatches = async (puuid: string | undefined) => {
	try {
		const res = await fetch(
			`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=20&api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

export type matchDataArrayType = {
	metadata: {
		participants: string[]
	}
	info: {
		queueId: string
		gameDuration: number

		gameEndTimestamp: number
		participants: [
			{
				championName: string
				champLevel: number
				deaths: number
				kills: number
				assists: number
				individualPosition: string
				lane: string
				riotIdGameName: string
				role: string
				item0: number
				item1: number
				item2: number
				item3: number
				item4: number
				item5: number
				item6: number
				teamId: number
				win: boolean
			}
		]
	}
}

const fetchDataFromMatch = async (array: string[]) => {
	let matchDataArray: matchDataArrayType[] = []

	for (const match of array) {
		try {
			const res = await fetch(
				`https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
			)

			const matchData = await res.json()
			matchDataArray = [...matchDataArray, matchData]
		} catch (error) {
			console.log(error)
		}
	}

	return matchDataArray
}
