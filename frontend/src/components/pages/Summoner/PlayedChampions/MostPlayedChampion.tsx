import { useSummonerContext } from "@/context/useSummonerContext"
import { matchInfoProps, participants } from "@/types/types"

const MostPlayedChampion = ({ data }: { data: matchInfoProps }) => {
	const { summonerData } = useSummonerContext()

	const playedChampionsStats = data ? countChampionsGame(data?.summonerInfo) : []
	return (
		summonerData && (
			<div className=' w-[30%]  self-start  text-c1 space-y-2 px-4 '>
				{playedChampionsStats.map(item => (
					<div
						key={item.championName}
						className='flex items-center justify-between px-4 py-2 bg-c-1  text-c-2  rounded-xl '>
						<div className='flex gap-2 items-center  '>
							<img
								width={60}
								src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item.championName}.png`}
								className='rounded-full'
								alt=''
							/>
							<p className='text-xl font-bold'>{item.championName}</p>
						</div>
						<div className='text-center'>
							<p className='text-[18px] font-bold'>{Number(item.kda).toFixed(2)}</p>
							<p>
								{(item.kill / item.playedGame).toFixed(2)} /{" "}
								{(item.assist / item.playedGame).toFixed(2)} /{" "}
								{(item.death / item.playedGame).toFixed(2)}
							</p>
						</div>
						<div className='text-center'>
							<p className='text-c-victory'>
								{((item.win / item.playedGame) * 100).toFixed(2)}%
							</p>
							<p className='text-c-3'>{item.playedGame} played</p>
						</div>
					</div>
				))}
			</div>
		)
	)
}

export default MostPlayedChampion

const countChampionsGame = (array: participants[]) => {
	const championStats: championStatsType = {}

	array.forEach(item => {
		if (!championStats[item.championName]) {
			championStats[item.championName] = {
				playedGame: 0,
				win: 0,
				lose: 0,
				kda: "0",
				kill: 0,
				assist: 0,
				death: 0,
				championName: item.championName,
			}
		}

		championStats[item.championName].playedGame += 1
		item.win
			? (championStats[item.championName].win += 1)
			: (championStats[item.championName].lose += 1)

		championStats[item.championName].kill += item.kills
		championStats[item.championName].assist += item.assists
		championStats[item.championName].death += item.deaths
		championStats[item.championName].kda = (
			(championStats[item.championName].kill +
				championStats[item.championName].assist) /
			championStats[item.championName].death
		).toFixed(2)
	})

	const championsSortedByPlayedGames = Object.values(championStats)

	championsSortedByPlayedGames.sort((a, b) => b.playedGame - a.playedGame)

	return championsSortedByPlayedGames
}

type championStatsType = {
	[key: string]: {
		playedGame: number
		win: number
		lose: number
		kda: string
		kill: number
		assist: number
		death: number
		championName: string
	}
}
