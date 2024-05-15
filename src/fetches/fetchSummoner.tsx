import { champion, championDetails } from "@/interfaces/interfaces"
import { fetchAllChampion } from "./fetchChampions"

export const fetchSummoner = async (name: string) => {
	let data2
	let ranking
	let championMastery: champion[]
	let allChampions: championDetails[] | undefined

	try {
		const res = await fetch(`http://localhost:8800/summoners/${name}`)
		const data = await res.json()

		if (data) {
			data2 = await fetchSummonerByPuuid(data.puuid)
			championMastery = await fetchChampionMastery(data2.puuid)

			championMastery = championMastery.slice(0, 3)

			allChampions = await fetchAllChampion(championMastery)

			if (data2) {
				ranking = await fetchSummonerById(data2.id)

				ranking = ranking[0]
			}
		}

		const mergeData = {
			...data,
			...data2,
			...ranking,
			threeChampions: allChampions,
		}

		return mergeData
	} catch (error) {
		console.log({ error })
	}
}

export const fetchSummonerByPuuid = async (puuid: string | undefined) => {
	try {
		const res = await fetch(
			`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

const fetchSummonerById = async (id: string | undefined) => {
	try {
		const res = await fetch(
			`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}

export const fetchChampionMastery = async (puuid: string | undefined) => {
	try {
		const res = await fetch(
			`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}
