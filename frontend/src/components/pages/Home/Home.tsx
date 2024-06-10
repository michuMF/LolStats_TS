import { useSummonerContext } from "@/context/useSummonerContext"
import { useErrorContext } from "@/context/useErrorContext"
import { fetchSummoner } from "@/fetches/fetchSummoner"
import { useState } from "react"

import { Link, useOutletContext } from "react-router-dom"
import video from "../../../assets/backgroundVideo.webm"
import { ContextValueProps } from "../Root/Root"

const Home = () => {
	const { setIsLoading } = useOutletContext<ContextValueProps>()
	const { setSummonerData } = useSummonerContext()
	const { setError } = useErrorContext()
	const [region, setRegion] = useState(false)
	const [regionName, setRegionName] = useState({ region: "EUNE", name: "eun1" })
	const [value, setValue] = useState({
		gameName: "Taidani",
		gameTag: "",
		defaultGameTag: regionName.region,
	})

	const regions = [
		{ region: "EUNE", name: "eun1" },
		{ region: "EUW", name: "euw1" },
	]

	return (
		<>
			<main className=' container mx-auto  min-h-[calc(100vh-110px)] relative   flex flex-col items-center justify-between  '>
				<div className='flex items-center justify-center col-span-2 relative   z-10    flex-1   '>
					<div className='relative  '>
						<button
							className='h-[50px] z-10 bg-c-2 px-4 rounded-l-xl '
							onClick={() => setRegion(!region)}>
							{regionName.region}
						</button>
						<div
							style={{ display: region ? "block" : "none" }}
							className='absolute bg-white   left-0 right-0'>
							<ul className=' space-y-1 text-center   p-1 '>
								{regions.map(({ region, name }) => (
									<li key={region} className='p-2   bg-c-2'>
										<button
											className=''
											onClick={() => {
												setRegionName(prev => ({ ...prev, region: region, name: name }))
												setRegion(false)
											}}>
											{region}
										</button>
									</li>
								))}
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
						onClick={async () => {
							try {
								setIsLoading(true)
								setError(false)
								const res = await fetchSummoner(value, regionName.name)
								console.log(res)

								if (res === false) return setError(true)
								return setSummonerData(res)
							} catch (err) {
								console.log("gfdgdfg")

								setError(true)
							} finally {
								setIsLoading(false)
							}
						}}
						className='bg-c-2 text-c1 px-4 py-2 rounded-r-xl  h-[50px] z-10 flex items-center'>
						Search
					</Link>
				</div>

				<footer className='  top-0 col-span-2   w-full h-full   flex items-end  '>
					<video loop autoPlay muted className=' w-full h-full '>
						<source className='' src={video} type='' />
					</video>
				</footer>
			</main>
		</>
	)
}
export default Home
