import { champion, championDetails } from "@/interfaces/types"
import { fetchAllChampion } from "./fetchChampions"
import {
	fetchChampionMastery,
	fetchDataFromMatch,
	fetchMatches,
	fetchSummonerById,
	fetchSummonerByPuuid,
	fetchSummonersRunes,
	fetchSummonersSpells,
} from "./fetchDatas/FetchDatas"

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

	let summonerSpellsId
	let summonerSpellUsesBySummonerD
	let summonerSpellUsesBySummonerF

	name.gameTag ? (gameTag = name.gameTag) : (gameTag = name.defaultGameTag)
	try {
		const res = await fetch(
			`http://localhost:8800/summoners/${name.gameName}/${gameTag}`
		)
		const data = await res.json()

		data2 = await fetchSummonerByPuuid(data.puuid, region)
		const matchArray = await fetchMatches(data.puuid)
		const summonerSpells = await fetchSummonersSpells()
		const dataFromMatches = await fetchDataFromMatch(matchArray, name.gameName)

		const allRunes = await fetchSummonersRunes()

		const summonerChampions = dataFromMatches.summonerInfo

		const test = summonerChampions.map(summonerInfo => {
			return summonerInfo?.perks.styles[0].selections.map(item => item.perk)
		})

		const test2 = summonerChampions.map(summonerInfo => {
			return summonerInfo?.perks.styles[1].selections.map(item => item.perk)
		})

		const summonerMainRuneId = test.map(item => item[0])
		const summonerSecondRuneId = test2.map(item => item[0])

		const summonerMainRune = summonerMainRuneId.map(item =>
			allRunes?.find(rune =>
				rune.slots.find(rune2 => rune2.runes.find(rune3 => rune3.id === item))
			)
		)

		const summonerSecondRune = summonerSecondRuneId.map(item =>
			allRunes?.find(rune =>
				rune.slots.find(rune2 => rune2.runes.find(rune3 => rune3.id === item))
			)
		)

		const slots = summonerMainRune.map(item => item?.slots)

		const runesTree = slots.map((slot, index) =>
			slot?.find(rune =>
				rune.runes.find(item => item.id === summonerMainRuneId[index])
			)
		)

		const summonerMainRunesFromMatch = runesTree.map((item, index) =>
			item?.runes.find(item => item.id === summonerMainRuneId[index])
		)

		summonerSpellsId = summonerChampions
			.map(summonerInfo => [summonerInfo?.summoner1Id, summonerInfo?.summoner2Id])
			.filter(item => item.length === 2)

		const summonerSpellsOne = summonerSpellsId.map(spell => spell[0])
		const summonerSpellsTwo = summonerSpellsId.map(spell => spell[1])

		summonerSpellUsesBySummonerD = summonerSpellsOne.map(spell => {
			return summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
		})

		summonerSpellUsesBySummonerF = summonerSpellsTwo.map(spell => {
			return summonerSpells?.filter(sumSpell => sumSpell.key == spell?.toString())
		})

		championMastery = await fetchChampionMastery(data2.puuid, region)

		championMastery = championMastery.slice(0, 3)

		allChampions = await fetchAllChampion(championMastery)
		ranking = await fetchSummonerById(data2.id, region)

		const mergeData = {
			...data,
			...data2,
			ranking: ranking,
			threeChampions: allChampions,
			matchArray: dataFromMatches,
			summonerSpells: {
				summonerSpellUsesBySummonerD,
				summonerSpellUsesBySummonerF,
			},
			summonerInfoFromMatch: summonerChampions,
			summonerMainRunesFromMatch: summonerMainRunesFromMatch,
			summonerSecondaryRunesFromMatch: summonerSecondRune,
		}

		return mergeData
	} catch (error) {
		console.log({ error })
	}
}
