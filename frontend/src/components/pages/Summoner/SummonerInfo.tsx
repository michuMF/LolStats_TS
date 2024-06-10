import { useSummonerContext } from "@/context/useSummonerContext"
import { Link } from "react-router-dom"

const SummonerInfo = () => {
	const { summonerData } = useSummonerContext()

	return (
		summonerData && (
			<div className='flex justify-around items-center py-5  '>
				<div className='space-y-5 bg-c-1 text-c-2 p-5 rounded-xl '>
					<h2 className='text-center'>{summonerData.gameName}</h2>

					<div className='relative '>
						<img
							src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${summonerData.profileIconId}.png`}
							alt=''
						/>
						<p className='absolute bottom-0 right-0  bg-c-2 text-c-1 px-4 py-2 rounded-full'>
							{summonerData.summonerLevel}
						</p>
					</div>
					<div className=''>
						<Link className='bg-c-2 text-c-1 px-4 py-2 rounded ' to='/Summoner'>
							Update
						</Link>
					</div>
				</div>
				<div className=''>
					<div className='flex items-center flex-col  gap-5 bg-c-1  text-c-3 p-2 rounded-xl'>
						{summonerData.ranking
							.map(info => (
								<div key={info.queueType} className='grid grid-cols-3 gap-2 px-2 py-1'>
									<div className='flex gap-3 items-center'>
										<h3 className=''>
											{info.tier.charAt(0).toUpperCase() +
												info.tier.slice(1).toLowerCase()}
										</h3>
										<h3>{info.rank}</h3>
									</div>

									<div className=' flex flex-col items-center'>
										<h4 className='text-center font-bold   '>
											{info.queueType === "RANKED_SOLO_5x5"
												? "Ranked Solo"
												: "Ranked Flex"}
										</h4>
										<img
											width={200}
											className=' '
											src={`./RankedEmblems/Rank=${
												info.tier.charAt(0).toUpperCase() + info.tier.slice(1).toLowerCase()
											}.png`}
										/>
									</div>
									<div className='flex items-center justify-around text-center '>
										<div className=''>
											<p>
												Win Rate{" "}
												{((info.wins / (info.losses + info.wins)) * 100).toFixed(2)}%{" "}
											</p>
											<p className='tracking-widest'>
												{info.wins}W {info.losses}L
											</p>
										</div>
										<p>{info.leaguePoints} LP</p>
									</div>
								</div>
							))
							.reverse()}
					</div>
				</div>
			</div>
		)
	)
}

export default SummonerInfo
