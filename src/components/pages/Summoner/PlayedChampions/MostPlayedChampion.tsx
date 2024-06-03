import { useSummonerContext } from "@/context/useSummonerContext"
import { participants } from "@/interfaces/types"

const MostPlayedChampion = () => {
	const { summonerData } = useSummonerContext()

	const playedChampionsStats = countChampionsGame(
		summonerData?.matchArray?.summonerInfo
	)
	return (
		summonerData && (
			<div className=' w-[30%]  self-start  text-c1 '>
				{playedChampionsStats.map(item => (
					<div
						key={item.championName}
						className='flex items-center justify-around py-2'>
						<div className='flex gap-2 items-center'>
							<img
								width={60}
								src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item.championName}.png`}
								className='rounded-full'
								alt=''
							/>
							<p className='text-xl font-bold'>{item.championName}</p>
						</div>
						<div className='text-center'>
							<p>{item.kda}</p>
							<p>
								{item.kill / item.playedGame} / {item.assist / item.playedGame} /{" "}
								{item.death / item.playedGame}
							</p>
						</div>
						<div className='text-center'>
							<p className='text-victory'>{(item.win / item.playedGame) * 100}%</p>
							<p className='text-c4'>{item.playedGame} played</p>
						</div>
					</div>
				))}
			</div>
		)
	)
}

export default MostPlayedChampion

const countChampionsGame = (
	array: (participants | undefined)[] | undefined
) => {
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
