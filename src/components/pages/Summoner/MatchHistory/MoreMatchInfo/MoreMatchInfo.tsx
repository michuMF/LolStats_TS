import { useSummonerContext } from "@/context/useSummonerContext"
import { FaArrowDown } from "react-icons/fa"
import blankSquare from "../../../../../assets/epmtyitemslot.png"

const MoreMatchInfo = ({
	toggleContent,
	index,
	show,
}: {
	toggleContent: (index: number) => void
	index: number
	show: { [key: number]: boolean }
}) => {
	const { summonerData } = useSummonerContext()

	const summonersItem = summonerData?.matchArray.participantsInfo.map(
		participant =>
			participant.map(stat => [
				stat.item0,
				stat.item1,
				stat.item2,
				stat.item3,
				stat.item4,
				stat.item5,
				stat.item6,
			])
	)

	const dmgDealt = summonerData?.matchArray.participantsInfo.map(champion =>
		champion.map(stat => stat.totalDamageDealtToChampions)
	)
	const dmgTaken = summonerData?.matchArray.participantsInfo.map(champion =>
		champion.map(stat => stat.totalDamageTaken)
	)

	const highestDmgDealt = dmgDealt?.map(item => Math.max(...item))

	const highestDmgTaken = dmgTaken?.map(item => Math.max(...item))

	return (
		<>
			<div className='absolute right-0 bottom-0'>
				<button onClick={() => toggleContent(index)}>
					<FaArrowDown />
				</button>
			</div>
			{show[index] && (
				<div className=' border-b border-white   '>
					<div className='grid grid-cols-5 place-content-center text-center w-full '>
						<p className='p-2 border-4 border-r-0 border-c2'>Champions</p>
						<p className='p-2 border-4 border-r-0 border-c2 '>DMG Dealt/Taken</p>
						<p className='p-2 border-4 border-r-0 border-c2'>KDA</p>
						<p className='p-2 border-4 border-r-0 border-c2'>CS</p>
						<p className='p-2 border-4 border-c2 '>Items</p>
						{summonerData?.matchArray.participantsInfo[index].map((item, i) => {
							return (
								<>
									<div
										className={` pl-2 flex items-center gap-1 ${
											item.win ? "bg-victory" : "bg-defeat"
										}`}>
										<div className='relative'>
											<img
												width={42}
												src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${item.championName}.png`}
												alt='championIcon'
											/>
											<p className='absolute bottom-0 left-0 -translate-x-1/3 text-sm text-white bg-black rounded-full p-[1px]'>
												{item.champLevel}
											</p>
										</div>

										<div>
											{summonerData?.matchArray.summonerSpells1[index][i]?.map(
												(item, index) => (
													<img
														key={index}
														width={21}
														src={`./spell/${item.id}.png`}
														alt=''
													/>
												)
											)}
											{summonerData?.matchArray.summonerSpells2[index][i]?.map(
												(item, index) => (
													<img
														key={index}
														width={21}
														src={`./spell/${item.id}.png`}
														alt=''
													/>
												)
											)}
										</div>
										<div>
											<img width={42} src={`./${item.runes?.icon}`} alt='' />
										</div>
										<p className='w-20'>{item.riotIdGameName}</p>
									</div>
									<div
										className={`flex gap-5 bg-defeat ${
											item.win ? "bg-victory" : "bg-defeat"
										}`}>
										<div>
											<p className='text-center'>{item.totalDamageDealtToChampions}</p>
											<div className='border bg-white w-20'>
												<div
													style={{
														width: `${
															(item.totalDamageDealtToChampions / highestDmgDealt[index]) * 100
														}%`,
													}}
													className={` h-2 bg-c2 `}></div>
											</div>
										</div>
										<div>
											<p className='text-center'>{item.totalDamageTaken}</p>
											<div className='border bg-white w-20'>
												<div
													style={{
														width: `${
															(item.totalDamageTaken / highestDmgTaken[index]) * 100
														}%`,
													}}
													className={` h-2 bg-c4 `}></div>
											</div>
										</div>
									</div>
									<div
										className={`  flex flex-col items-center ${
											item.win ? "bg-victory" : "bg-defeat"
										}`}>
										<div className='flex gap-2'>
											<p>{item.kills} /</p>
											<p>{item.deaths} /</p>
											<p>{item.assists}</p>
										</div>
										<p className='text-center'>{item.challenges.kda.toFixed(2)}</p>
									</div>
									<p className={`${item.win ? "bg-victory" : "bg-defeat"}`}>
										{item.totalMinionsKilled}
									</p>
									<div
										className={`flex  gap-1 ${item.win ? "bg-victory" : "bg-defeat"}`}>
										{summonersItem &&
											summonersItem[index][i]?.map((item, index) =>
												item > 0 ? (
													<img
														width={25}
														className='object-contain'
														src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${item}.png`}
													/>
												) : (
													<img className='object-contain' width={25} src={blankSquare} />
												)
											)}
									</div>
								</>
							)
						})}
					</div>
					<div></div>
				</div>
			)}
		</>
	)
}

export default MoreMatchInfo
