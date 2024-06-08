import blankSquare from "../../../../../assets/epmtyitemslot.png"
import MatchStatus from "./MatchStatus"
import { matchInfoProps, participants } from "@/types/types"
import SummonerPlayedChampion from "./SummonerPlayedChampion"
import SummonerSpells from "./SummonerSpells"
import SummonersRunes from "./SummonersRunes"
import SummonerKDA from "./SummonerKDA"
const SummonerStats = ({
	match,
	count,
	data,
}: {
	match: participants | undefined
	count: number
	data: matchInfoProps | undefined
}) => {
	const itemsArray: number[] = []

	return (
		match && (
			<div className='flex-1 flex items-center justify-center  '>
				<div key={count}>
					<div className=''>
						<div className={`flex px-2 gap-5 `}>
							<MatchStatus data={data} match={match} count={count} />
							<SummonerPlayedChampion match={match} />
							<div className=' flex flex-col justify-around  '>
								<div className='flex items-center gap-1 '>
									<SummonerSpells match={match} count={count} />
									<SummonersRunes match={match} count={count} />
									<SummonerKDA
										death={match.deaths}
										kill={match.kills}
										assist={match.assists}
										kda={match.challenges.kda}
									/>
								</div>
								<div className='flex gap-1 items-center '>
									<div className='hidden'>
										{itemsArray.push(
											match.item0,
											match.item1,
											match.item2,
											match.item3,
											match.item4,
											match.item5,
											match.item6
										)}
									</div>
									{itemsArray.map((item, index) => (
										<div key={index}>
											{item ? (
												<img
													width={40}
													height={40}
													alt={`${item}`}
													className='object-contain border border-black rounded-lg'
													src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${item}.png`}
												/>
											) : (
												<img
													width={40}
													src={blankSquare}
													className='rounded-lg'
													alt='blank Item'
												/>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default SummonerStats
