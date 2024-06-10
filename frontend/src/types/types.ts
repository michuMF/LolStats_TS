export interface summonerDataProps {
	puuid: string
	gameName: string
	tagLine: string
	id: string
	profileIconId: number
	revisionDate: number
	summonerLevel: number
	accountId: string
	freshBlood: boolean
	hotStreak: boolean
	inactive: boolean
	leagueId: string
	leaguePoints: number
	queueType: string
	rank: string
	tier: string
	veteran: boolean
	wins: number
	losses: number
	threeChampions: championDetails[]
	matchArray: matchInfoProps2
	summonerInfoFromMatch: participants[]

	summonerSpells: {
		summonerSpellUsesBySummonerD: [SummonerSpell[]]
		summonerSpellUsesBySummonerF: [SummonerSpell[]]
	}
	ranking: [
		{
			tier: string
			rank: string
			wins: number
			losses: number
			leaguePoints: number

			queueType: string
		}
	]
	summonerMainRunesFromMatch: [
		{
			id: number
			key: string
			name: string
			icon: string
		}
	]
	summonerSecondaryRunesFromMatch: [
		{
			id: number
			key: string
			name: string
			icon: string
		}
	]
}

export type SummonerRankingProps = {
	freshBlood: boolean
	hotStreak: boolean
	inactive: boolean
	leagueId: string
	leaguePoints: number
	queueType: string
	rank: string
	tier: string
	veteran: boolean
	wins: number
	losses: number
	summonerId: string
}

export type AllRunesProp = [
	{
		icon: string
		id: number
		key: string
		name: string
		slots: [
			{
				runes: [{ id: number; key: string; name: string; icon: string }]
			}
		]
	}
]
export type SummonerSpell = {
	id: string
	name: string
	key: string
	description: string
}

export type matchDataArrayType = {
	metadata: {
		participants: string[]
	}
	info: {
		queueId: number
		gameDuration: number
		participants: participants[]
		gameEndTimestamp: number
	}
}
export type matchInfoProps = {
	participantsInfo: participants[][]
	summonerInfo: (participants | undefined)[]
	matchInfo: {
		queueId: number
		gameDuration: number
		gameEndTimestamp: number
	}[][]
}

export type matchInfoProps2 = {
	allGames: matchInfoProps
	rankedGames: matchInfoProps
	flexGames: matchInfoProps
}

export type participants = {
	championName: string
	champLevel: number
	deaths: number
	kills: number
	assists: number
	individualPosition: string
	lane: string
	riotIdGameName: string
	role: string
	items: number[]
	item0: number
	item1: number
	item2: number
	item3: number
	item4: number
	item5: number
	item6: number
	teamId: number
	win: boolean
	summoner1Id: number
	summoner2Id: number
	perks: perksProps
	challenges: {
		kda: number
	}
	totalDamageDealtToChampions: number
	totalDamageTaken: number
	totalMinionsKilled: number
	runes:
		| {
				id: number
				key: string
				name: string
				icon: string
		  }
		| undefined

	secondaryRunes: {
		id: number
		key: string
		name: string
		icon: string
	}
}
export type perksProps = {
	styles: stylesProps[]
}
export type stylesProps = {
	description: string
	selections: selectionProps[]
	style: number
}

export type selectionProps = {
	perk: number
	var1: number
	var2: number
	var3: number
}

export interface champion {
	championId: string
	championLevel: number
	championPoints: number
}

export type championDetails = {
	test: string
	id: string
	key: string
	name: string
	title: string
	blurb: string
	image: {
		full: string
		sprite: string
		group: string
		x: number
		y: number
		w: number
		h: number
	}
	tags: string[]
	games: string[]
}

export type summonerContextProps = {
	summonerData: summonerDataProps | undefined
	setSummonerData: (data: summonerDataProps) => void
}
export type errorContextProps = {
	error: boolean
	setError: (data: boolean) => void
}
export type summonerContextProviderProps = {
	children: React.ReactNode
}

export type ChallengersArray = {
	summonerId: string
	wins: number
	losses: number
	leaguePoints: number
}
