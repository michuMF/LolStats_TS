import { useSummonerContext } from "@/context/useSummonerContext"
import { useEffect, useState } from "react"

const ONE_SECOND = 1000
const AUTO_DELAY = ONE_SECOND * 10

const Home = () => {
	const [imgIndex, setImgIndex] = useState(0)

	const { summonerData } = useSummonerContext()

	useEffect(() => {
		const interval = setInterval(() => {
			setImgIndex(prev => (prev + 1) % 3)
		}, AUTO_DELAY)
		return () => clearInterval(interval)
	}, [])

	return (
		<>
			<main className=' container mx-auto min-h-[calc(100vh-120px)] grid grid-cols-2 mt-10 '>
				{summonerData ? (
					<div className=' bg-c3 row-span-2 p-4 '>
						<h1>
							{summonerData.gameName} #{summonerData.tagLine}
						</h1>
						<p>{summonerData.summonerLevel}</p>
						<img
							src={`http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${summonerData.profileIconId}.png`}
							alt=''
						/>
						<div>
							<p>{summonerData.wins}</p>
							<p>{summonerData.losses}</p>
						</div>
						<div>{summonerData.queueType}</div>
						<div className='absolute '>
							<img
								width={200}
								className=''
								src={`/RankedEmblems/Rank=${
									summonerData.tier.toLowerCase().charAt(0).toUpperCase() +
									summonerData.tier.toLowerCase().slice(1)
								}.png`}
								alt=''
							/>
						</div>
					</div>
				) : (
					""
				)}
				{summonerData ? (
					<div
						style={{
							backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summonerData.threeChampions[imgIndex].id}_0.jpg')`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						className=''>
						<div className='flex flex-col  '>
							<h2 className=' bg-c1 px-6 py-3 rounded self-start ml-10 mt-5 '>
								{summonerData.threeChampions[imgIndex].name}
							</h2>
							<h3 className=' bg-c1 px-6 py-3 rounded self-start ml-10 mt-5 '>
								{summonerData.threeChampions[imgIndex].title}
							</h3>
							<p>{summonerData.threeChampions[imgIndex].blurb}</p>
						</div>
					</div>
				) : (
					""
				)}

				<div className='bg-c1'></div>
			</main>
		</>
	)
}
export default Home
