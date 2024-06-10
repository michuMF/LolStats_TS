import { useSummonerContext } from "@/context/useSummonerContext"
import { matchInfoProps, participants } from "@/types/types"

const PlayersFromMatch = ({
	count,

	data,
}: {
	count: number
	match: participants | undefined
	data: matchInfoProps | undefined
}) => {
	const { summonerData } = useSummonerContext()

	return (
		summonerData && (
			<div className='   flex-1 flex     '>
				<div className='space-y-1 flex-1'>
					{data?.participantsInfo[count].map((item, index) => {
						if (index < 5) {
							return (
								<div key={index} className='flex  gap-2 items-center'>
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
					{data?.participantsInfo[count].map((item, index) => {
						if (index > 4) {
							return (
								<div key={index} className='flex flex-1 gap-2 items-center'>
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
