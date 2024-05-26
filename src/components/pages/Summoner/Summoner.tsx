import { useSummonerContext } from "@/context/useSummonerContext"
import { Link } from "react-router-dom"

const gamesSystem = ["All", "Ranked Solo/Duo", "Ranked Flex"]
const Summoner = () => {
	const { summonerData } = useSummonerContext()
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60

		const formattedMinutes = minutes.toString().padStart(2, "0")
		const formattedSeconds = seconds.toString().padStart(2, "0")

		const formattedTime = `${formattedMinutes}:${formattedSeconds}`

		return formattedTime
	}
	const formatData = (time: number) => {
		// const date = new Date(time)

		// const formattedDate = date.toUTCString()
		const currentTimestamp = Date.now()

		const differenceInMilliseconds = currentTimestamp - time

		const differenceInDays = Math.round(
			differenceInMilliseconds / (1000 * 60 * 60 * 24)
		)

		return differenceInDays
	}

	// const lastThreeGames = summonerData?.matchArray
	// 	? summonerData?.matchArray.slice(0, 3)
	// 	: []

	const test = match => {
		let win
		match.info.participants.map(participant => {
			if (
				participant.riotIdGameName === summonerData?.gameName &&
				participant.win
			) {
				win = true
			} else {
				win = false
			}
		})
		return win
	}

	return (
		<div className='container mx-auto'>
			{summonerData ? (
				<div>
					<div>
						<h1>{summonerData.gameName}</h1>
						<p>{summonerData.summonerLevel}</p>
						<img
							src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`}
							alt=''
						/>
						<Link className='bg-c2 text-c1 px-4 py-2' to='/Summoner'>
							Update
						</Link>
					</div>
					<div className=' bg-c2 w-full mt-10 flex items-center justify-center gap-20 p-2  '>
						{gamesSystem.map((game, index) => (
							<div key={index} className='border flex-1 text-center rounded-lg'>
								<button>
									<h3 className=' font-bold text-xl tracking-wider'>{game}</h3>
								</button>
							</div>
						))}
					</div>

					<div className=' flex gap-4 mt-2'>
						<div className='border w-[30%]'>
							{summonerData.threeChampions.map(champion => (
								<div key={champion.id} className=''>
									<img
										width={50}
										src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champion.id}.png`}
										alt=''
									/>
									{champion.id}
								</div>
							))}
						</div>
						<div className='flex-1 '>
							{summonerData.matchArray.map(match => (
								<div className={` border flex  `}>
									{match.info.participants.map(participant => (
										<div>
											{participant.riotIdGameName === summonerData.gameName ? (
												<div className=''>
													<div className={`flex px-2 gap-2 `}>
														<div className='flex flex-col gap-2 items-center'>
															<div>
																<p className='text-center'>
																	{match.info.queueId == "420" ? "Ranked Solo" : "Ranked Flex"}
																</p>
																<p className='text-[#ffffff]'>
																	{formatData(match.info.gameEndTimestamp)} days ago
																</p>
															</div>
															<div className='w-4/5 mx-auto h-[1px]  bg-c5 '></div>
															<div>
																<p>{participant.win ? "Victory" : "Defeat"}</p>
																<p className=''>{formatTime(match.info.gameDuration)}</p>
															</div>
														</div>
														<div className='relative'>
															<img
																className=' rounded-full '
																src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${participant.championName}.png`}
															/>
															<div className='absolute bottom-0 right-0 bg-[#04052e] text-[#ffffff] px-2 py-1 rounded-full'>
																{participant.champLevel}
															</div>
														</div>
														<div className=' flex flex-col justify-end '>
															<div className='flex gap-1 items-center '>
																<img
																	width={30}
																	className='object-contain border h-[30px]'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item0}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item1}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item2}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item3}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item4}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item5}.png`}
																/>
																<img
																	width={30}
																	className='object-contain'
																	src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${participant.item6}.png`}
																/>
															</div>
														</div>
													</div>
												</div>
											) : (
												""
											)}
										</div>
									))}
									<div className='grid grid-cols-2 gap-1 w-3/5'>
										{match.info.participants.map(participant => (
											<div className='flex items-center gap-1'>
												<img
													width={25}
													className='rounded-lg object-contain'
													src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${participant.championName}.png`}
													alt=''
												/>
												<p>{participant.riotIdGameName}</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	)
}

export default Summoner
