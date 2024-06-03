import { useSummonerContext } from "@/context/useSummonerContext"
import { Link } from "react-router-dom"

const SummonerInfo = () => {
	const { summonerData } = useSummonerContext()

	return (
		summonerData && (
			<div className='flex justify-around items-center '>
				<div>
					<h1>{summonerData.gameName}</h1>

					<div className='relative'>
						<img
							src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`}
							alt=''
						/>
						<p className='absolute bottom-0 right-0  bg-c2 text-c1 px-4 py-2 rounded-full'>
							{summonerData.summonerLevel}
						</p>
					</div>
					<Link className='bg-c2 text-c1 px-4 py-2' to='/Summoner'>
						Update
					</Link>
				</div>
				<div className='relative flex flex-col items-center text-xl'>
					<p>{summonerData.queueType}</p>
					<div className=' items-center gap-5'>
						{summonerData.ranking
							.map(info => (
								<div key={info.queueType} className='flex   items-center gap-5 '>
									<h2 className='text-3xl font-semibold'>
										{info.tier.charAt(0).toUpperCase() + info.tier.slice(1).toLowerCase()}
									</h2>
									<p className='text-3xl'>{info.rank}</p>
									<div>
										<p className='text-center font-bold '>
											{info.queueType === "RANKED_SOLO_5x5"
												? "Ranked Solo/Duo"
												: "Ranked Flex"}
										</p>
										<img
											width={200}
											className=' '
											src={`./RankedEmblems/Rank=${
												info.tier.charAt(0).toUpperCase() + info.tier.slice(1).toLowerCase()
											}.png`}
										/>
									</div>
									<div className='flex flex-col items-center'>
										<p>Win Rate {(info.wins / (info.losses + info.wins)) * 100}% </p>
										<p>
											{info.wins}W {info.losses}L
										</p>
									</div>
									<p>{info.leaguePoints} LP</p>
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
