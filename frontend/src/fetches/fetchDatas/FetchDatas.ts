import {
	AllRunesProp,
	SummonerRankingProps,
	SummonerSpell,
	matchDataArrayType,
	matchInfoProps,
	matchInfoProps2,
	participants,
} from "@/types/types"

export const fetchSummonerById = async (
	id: string | undefined,
	region: string
): Promise<SummonerRankingProps[] | undefined> => {
	try {
		const res = await fetch(
			`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${
				import.meta.env.VITE_LOL_API_KEY
			}`
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

export const fetchDataFromMatch = async (
	array: string[] | undefined,
	gameName: string
): Promise<matchInfoProps2> => {
	let matchDataArray: matchDataArrayType[] = []
	if (array)
		for (const match of array) {
			try {
				const res = await fetch(
					`https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${
						import.meta.env.VITE_LOL_API_KEY
					}`
				)

				const matchData = await res.json()

				matchDataArray = [...matchDataArray, matchData]
			} catch (error) {
				console.log(error)
			}
		}

	const matchRankedSoloDuoInfo = matchDataArray.filter(
		info => info.info.queueId === 420
	)

	const matchRankedFlexInfo = matchDataArray.filter(
		info => info.info.queueId === 440
	)

	const allGamesData = await splitTheData(
		matchDataArray,
		matchDataArray,
		gameName
	)

	const rankedGamesData = await splitTheData(
		matchRankedSoloDuoInfo,
		matchRankedSoloDuoInfo,
		gameName
	)

	const flexGamesData = await splitTheData(
		matchRankedFlexInfo,
		matchRankedFlexInfo,
		gameName
	)

	return {
		allGames: allGamesData,
		rankedGames: rankedGamesData,
		flexGames: flexGamesData,
	}
}

const splitTheData = async (
	array: matchDataArrayType[],
	matchDataArray: matchDataArrayType[],
	gameName: string
): Promise<matchInfoProps> => {
	const participants = array.map(info => info.info.participants)

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

	const arrayOfMainRunes = runesID.map(runes => {
		return runes.map(rune => {
			return mainRunesNamesFlat?.find(item => item.id === rune)
		})
	})

	let participantsInfo = participants.map((participant, index) =>
		participant.map(participant2 => {
			return {
				...participant2,
				runes: arrayOfMainRunes[index].find(rune => {
					return rune?.id == participant2.perks.styles[0].selections[0].perk
				}),
			}
		})
	)

	let summonerInfo: participants[] = participants.map(
		participant =>
			participant.find(
				summoner => summoner.riotIdGameName === gameName
			) as participants
	) as participants[]

	const secondaryRunesId = summonerInfo.map(
		match => match?.perks?.styles[1].style
	)

	const secondaryRunes = secondaryRunesId.map(runes =>
		allRunes?.find(runes2 => runes2.id === runes)
	)

	summonerInfo = summonerInfo.map((summoner, index) => {
		return {
			...summoner,
			runes: arrayOfMainRunes[index].find(rune => {
				return rune?.id == summoner?.perks.styles[0].selections[0].perk
			}),
			secondaryRunes: secondaryRunes[index],
		}
	})

	const summonerSpells = await returnSummonerSpells(summonerInfo)

	const summonerSpells2 = await returnSummonerSpells2(participantsInfo)

	participantsInfo = participantsInfo.map((participant, index) => {
		return participant.map((participant2, index2) => {
			return {
				...participant2,
				summoner1Id: summonerSpells2.summonerSpellUsesBySummonerD[index][index2],
				summoner2Id: summonerSpells2.summonerSpellUsesBySummonerF[index][index2],
			}
		})
	})

	summonerInfo = summonerInfo.map((summoner, index) => {
		return {
			...summoner,
			summoner1Id: summonerSpells.summonerSpellUsesBySummonerD[index][0],
			summoner2Id: summonerSpells.summonerSpellUsesBySummonerF[index][0],
		}
	})

	const matchInfo = matchDataArray.map(info => [
		{
			gameDuration: info.info.gameDuration,
			gameEndTimestamp: info.info.gameEndTimestamp,
			queueId: info.info.queueId,
		},
	])

	return {
		summonerInfo,
		matchInfo,
		participantsInfo,
	}
}

const returnSummonerSpells = async (array: (participants | undefined)[]) => {
	const summonerSpells = await fetchSummonersSpells()
	const summonerChampions = array
	const summonerSpellsId = summonerChampions
		.map(summonerInfo => [summonerInfo?.summoner1Id, summonerInfo?.summoner2Id])
		.filter(item => item.length === 2)

	const summonerSpellsOne = summonerSpellsId.map(spell => spell[0])
	const summonerSpellsTwo = summonerSpellsId.map(spell => spell[1])

	const summonerSpellUsesBySummonerD = summonerSpellsOne.map(spell => {
		return summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
	})

	const summonerSpellUsesBySummonerF = summonerSpellsTwo.map(spell => {
		return summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
	})

	return {
		summonerSpellUsesBySummonerD,
		summonerSpellUsesBySummonerF,
	}
}

const returnSummonerSpells2 = async (array: participants[][]) => {
	const summonerSpells = await fetchSummonersSpells()
	const summonerChampions = array

	const summonerSpellsId = summonerChampions.map(summonerInfo =>
		summonerInfo
			.map(summoner => [summoner?.summoner1Id, summoner?.summoner2Id])
			.filter(item => item.length === 2)
	)

	const summonerSpellsOne = summonerSpellsId.map(spell =>
		spell.map(spell => spell[0])
	)
	const summonerSpellsTwo = summonerSpellsId.map(spell =>
		spell.map(spell => spell[1])
	)

	let summonerSpellUsesBySummonerD = summonerSpellsOne.map(spell =>
		spell.map(spell =>
			summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
		)
	)

	summonerSpellUsesBySummonerD = summonerSpellUsesBySummonerD.map(spell =>
		spell.flat()
	)

	let summonerSpellUsesBySummonerF = summonerSpellsTwo.map(spell =>
		spell.map(spell =>
			summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
		)
	)
	summonerSpellUsesBySummonerF = summonerSpellUsesBySummonerF.map(spell =>
		spell.flat()
	)

	return {
		summonerSpellUsesBySummonerD,
		summonerSpellUsesBySummonerF,
	}
}

export const fetchMatches = async (
	puuid: string | undefined
): Promise<string[] | undefined> => {
	try {
		const res = await fetch(
			`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=20&api_key=${
				import.meta.env.VITE_LOL_API_KEY
			}`
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
			`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${
				import.meta.env.VITE_LOL_API_KEY
			}`
		)
		const data = await res.json()
		return data
	} catch (error) {
		console.log({ error })
	}
}
