import { useSummonerContext } from "@/context/useSummonerContext"

const PlayersFromMatch = ({ count }: { count: number }) => {
	const { summonerData } = useSummonerContext()

	return (
		summonerData && (
			<div className='   flex-1 flex     '>
				<div className='space-y-1 flex-1'>
					{summonerData.matchArray.participantsInfo[count].map((item, index) => {
						if (index < 5) {
							return (
								<div className='flex  gap-2 items-center'>
									<img
										className='rounded-full'
										width={30}
										src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item.championName}.png`}
										alt=''
									/>
									<p>{item.riotIdGameName}</p>
								</div>
							)
						} else {
							return ""
						}
					})}
				</div>
				<div className='space-y-1 flex-1'>
					{summonerData.matchArray.participantsInfo[count].map((item, index) => {
						if (index > 4) {
							return (
								<div className='flex flex-1 gap-2 items-center'>
									<img
										className='rounded-full'
										width={30}
										src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item.championName}.png`}
										alt=''
									/>
									<p>{item.riotIdGameName}</p>
								</div>
							)
						} else {
							return ""
						}
					})}
				</div>
			</div>
		)
	)
}

export default PlayersFromMatch
