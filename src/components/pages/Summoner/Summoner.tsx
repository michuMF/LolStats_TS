import { useSummonerContext } from "@/context/useSummonerContext"
import SummonerInfo from "./SummonerInfo"
import GameMods from "./GameMods"
import MostPlayedChampion from "./PlayedChampions/MostPlayedChampion"
import MatchHistory from "./MatchHistory/MatchHistory"
import { useEffect, useState } from "react"

const Summoner = () => {
	const { summonerData } = useSummonerContext()

	const [data, setData] = useState(summonerData?.matchArray)

	useEffect(() => {
		setData(summonerData?.matchArray)
	}, [summonerData])

	return data ? (
		<div className='container mx-auto bg-[#fff]'>
			{summonerData ? (
				<div>
					<SummonerInfo />
					<GameMods data={data} setData={setData} />
					<div className=' flex  '>
						<MostPlayedChampion />
						<MatchHistory data={data} />
					</div>
				</div>
			) : (
				"Hello"
			)}
		</div>
	) : (
		<div>hello</div>
	)
}

export default Summoner
