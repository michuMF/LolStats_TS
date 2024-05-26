import { useSummonerContext } from "@/context/useSummonerContext"
import { fetchSummoner } from "@/fetches/fetchSummoner"
import { useState } from "react"
import yasuo from "../../../assets/mainBackgroundChampions/yasuo.png"
import thresh from "../../../assets/mainBackgroundChampions/thresh.png"
import diana from "../../../assets/mainBackgroundChampions/diana.png"
import footer from "../../../assets/footer/footer.png"
import { Link } from "react-router-dom"
// const ONE_SECOND = 1000
// const AUTO_DELAY = ONE_SECOND * 10

const Home = () => {
	// const regionOptions = [
	// 	{ region: "EUW", name: "euw1" },
	// 	{ region: "EUNE", name: "eun1" },
	// ]

	const { setSummonerData } = useSummonerContext()
	// const [imgIndex, setImgIndex] = useState(0)
	const [region, setRegion] = useState(false)
	const [regionName, setRegionName] = useState({ region: "EUNE", name: "eun1" })
	const [value, setValue] = useState({
		gameName: "Taidani",
		gameTag: "",
		defaultGameTag: regionName.region,
	})

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setImgIndex(prev => (prev + 1) % 3)
	// 	}, AUTO_DELAY)
	// 	return () => clearInterval(interval)
	// }, [])

	return (
		<>
			<main className=' container mx-auto min-h-[calc(100vh-120px)] grid grid-cols-2 mt-10 '>
				<div className='flex items-center justify-center col-span-2 relative '>
					<div className='absolute top-0 left-0 z-0'>
						<img src={yasuo} className='' alt='' />
					</div>
					<div className='absolute top-0 left-1/2 -translate-x-2/3  z-0'>
						<img src={thresh} className='' alt='' />
					</div>
					<div className='absolute top-0 right-0 z-0'>
						<img src={diana} className='' alt='' />
					</div>

					<div className='relative'>
						<button
							className='h-[50px] z-10 bg-c2 px-4 rounded-l-xl '
							onClick={() => setRegion(!region)}>
							{regionName.region}
						</button>
						<div
							style={{ display: region ? "block" : "none" }}
							className='absolute bg-c2 left-0 right-0'>
							<ul className='border'>
								<li className='p-1 border-b'>
									<button
										className=''
										onClick={() => {
											setRegionName(prev => ({ ...prev, region: "EUW", name: "euw1" }))
											setRegion(false)
										}}>
										EUW
									</button>
								</li>
								<li className='p-1 border-b'>
									<button
										onClick={() => {
											setRegionName(prev => ({ ...prev, region: "EUNE", name: "eun1" }))
											setRegion(false)
										}}>
										EUNE
									</button>
								</li>
							</ul>
						</div>
					</div>
					<input
						type='text'
						placeholder='Summoners Name '
						className='px-4 py-2 w-[700px] h-[50px] z-10'
						onChange={e => setValue({ ...value, gameName: e.target.value })}
					/>
					<input
						type='text'
						className='px-4 py-2  w-[150px]  h-[50px] z-10 border-l'
						placeholder='#gametag'
						onChange={e => setValue({ ...value, gameTag: e.target.value })}
					/>

					<Link
						to={`/Summoner`}
						onClick={() => {
							fetchSummoner(value, regionName.name).then(res => setSummonerData(res))
						}}
						className='bg-c4 text-c1 px-4 py-2 rounded-r-xl  h-[50px] z-10 flex items-center'>
						Search
					</Link>
				</div>

				<div className='bg-c1'></div>

				<footer className=' col-span-2 items-center relative'>
					<img
						src={footer}
						alt=''
						className='absolute bottom-0 left-1/4 w-[800px]'
					/>
				</footer>
			</main>
		</>
	)
}
export default Home
