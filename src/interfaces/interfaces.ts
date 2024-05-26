import { matchDataArrayType } from "@/fetches/fetchSummoner"

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
	matchArray: matchDataArrayType[]
}

export interface champion {
	championId: string
	championLevel: number
	championPoints: number
}

export interface championDetails {
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

export interface summonerContextProps {
	summonerData: summonerDataProps | undefined
	setSummonerData: (data: summonerDataProps) => void
}
export interface summonerContextProviderProps {
	children: React.ReactNode
}
