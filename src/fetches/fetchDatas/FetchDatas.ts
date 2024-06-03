import {
	AllRunesProp,
	SummonerRankingProps,
	SummonerSpell,
	matchDataArrayType,
	matchInfoProps,
} from "@/interfaces/types"

export const fetchSummonerById = async (
	id: string | undefined,
	region: string
): Promise<SummonerRankingProps[] | undefined> => {
	try {
		const res = await fetch(
			`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-8493f798-9e09-448b-afd1-0d669ccfea7c`
		)
		const data: SummonerRankingProps[] = await res.json()

		return data
	} catch (error) {
		console.log({ error })
	}
}

export const fetchSummonersRunes = async (): Promise<
	AllRunesProp | undefined
> => {
	try {
		const res = await fetch(
			"https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/runesReforged.json"
		)
		const data = await res.json()

		return data
	} catch (error) {
		console.log(error)
		return undefined
	}
}

export const fetchSummonersSpells = async (): Promise<
	SummonerSpell[] | undefined
> => {
	try {
		const res = await fetch(
			"https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/summoner.json"
		)
		const data = await res.json()

		return Object.values(data.data)
	} catch (error) {
		console.log(error)
		return undefined
	}
}

export const getSummonersSpellById = () => {}

export const fetchDataFromMatch = async (
	array: string[] | undefined,
	gameName: string
): Promise<matchInfoProps> => {
	let matchDataArray: matchDataArrayType[] = []
	if (array)
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

	const participants = matchDataArray.map(info => info.info.participants)

	const participantsSummonerSpells1Info = participants.map(participant =>
		participant.map(participantInfo => participantInfo.summoner1Id)
	)
	const participantsSummonerSpells2Info = participants.map(participant =>
		participant.map(participantInfo => participantInfo.summoner2Id)
	)

	const summonerSpells = await fetchSummonersSpells()

	const runesID = participants.map(match =>
		match.map(participant => participant.perks.styles[0].selections[0].perk)
	)
	const allRunes = await fetchSummonersRunes()

	const mainRunes2 = allRunes?.filter(runes =>
		runes.slots.filter(runes => runes.runes[0])
	)

	const flat = mainRunes2?.map(item => item.slots.flat())

	const flat2 = flat?.flat()

	const mainRunesNames = flat2?.map(item => item.runes)

	const mainRunesNamesFlat = mainRunesNames?.flat()

	const arrayOfMainRunes = runesID.map((runes, index) => {
		return runes.map(rune => {
			return mainRunesNamesFlat?.find(item => item.id === rune)
		})
	})

	const test = participants.map((participant, index) =>
		participant.map((participant2, index2) => {
			return {
				...participant2,
				runes: arrayOfMainRunes[index].find((rune, i) => {
					return rune?.id == participant2.perks.styles[0].selections[0].perk
				}),
			}
		})
	)

	const summonerSpells1 = participantsSummonerSpells1Info.map(spell =>
		spell.map(item =>
			summonerSpells?.filter(sumSpell => sumSpell.key == item?.toString())
		)
	)
	const summonerSpells2 = participantsSummonerSpells2Info.map(spell =>
		spell.map(item =>
			summonerSpells?.filter(sumSpell => sumSpell.key == item?.toString())
		)
	)

	const summonerGameInfo = participants.map(participant =>
		participant.find(summoner => summoner.riotIdGameName === gameName)
	)

	const matchInfo = matchDataArray.map(info => [
		{
			gameDuration: info.info.gameDuration,
			gameEndTimestamp: info.info.gameEndTimestamp,
			queueId: info.info.queueId,
		},
	])

	console.log(matchInfo)

	const test2 = test.map((participant, index) => {
		return { ...participant, queueId: matchInfo[index][0].queueId }
	})

	console.log(test2[0])

	const matchInfoArray = {
		participantsInfo: test,
		summonerInfo: summonerGameInfo,
		matchInfo: matchInfo,
		summonerSpells1: summonerSpells1,
		summonerSpells2: summonerSpells2,
	}

	return matchInfoArray
}

export const fetchMatches = async (
	puuid: string | undefined
): Promise<string[] | undefined> => {
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
