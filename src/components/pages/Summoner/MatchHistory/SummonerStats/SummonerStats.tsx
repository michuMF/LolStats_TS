import blankSquare from "../../../../../assets/epmtyitemslot.png"
import MatchStatus from "./MatchStatus"
import { participants } from "@/interfaces/types"
import SummonerPlayedChampion from "./SummonerPlayedChampion"
import SummonerSpells from "./SummonerSpells"
import SummonersRunes from "./SummonersRunes"
import SummonerKDA from "./SummonerKDA"
const SummonerStats = ({
	match,
	count,
}: {
	match: participants | undefined
	count: number
}) => {
	const itemsArray: number[] = []

	return (
		match && (
			<div className='flex-1 flex items-center justify-center  '>
				<div key={count}>
					<div className=''>
						<div className={`flex px-2 gap-5 `}>
							<MatchStatus match={match} count={count} />
							<SummonerPlayedChampion match={match} />
							<div className=' flex flex-col justify-between  '>
								<div className='flex items-center gap-1'>
									<SummonerSpells count={count} />
									<SummonersRunes count={count} />
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
													width={30}
													alt={`${item}`}
													className='object-contain border h-[30px]'
													src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${item}.png`}
												/>
											) : (
												<img width={30} src={blankSquare} alt='blank Item' />
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
