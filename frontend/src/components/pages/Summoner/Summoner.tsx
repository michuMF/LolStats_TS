import { useSummonerContext } from "@/context/useSummonerContext"
import SummonerInfo from "./SummonerInfo"
import GameMods from "./GameMods"
import { useEffect, useState } from "react"
import { useErrorContext } from "@/context/useErrorContext"
import Error from "./Error"
import MostPlayedChampion from "./PlayedChampions/MostPlayedChampion"
import MatchHistory from "./MatchHistory/MatchHistory"
import { useOutletContext } from "react-router-dom"
import { ContextValueProps } from "../Root/Root"
import Loading from "./Loading"

const Summoner = () => {
	const { summonerData } = useSummonerContext()
	const { error } = useErrorContext()
	const { isLoading } = useOutletContext<ContextValueProps>()
	const [data, setData] = useState(summonerData?.matchArray.allGames)

	useEffect(() => {
		setData(summonerData?.matchArray.allGames)
	}, [summonerData])

	if (error) return <Error />
	if (isLoading) return <Loading />
	return (
		<div className='container mx-auto bg-[#fff]'>
			<div>
				<SummonerInfo />
				<GameMods data={data} setData={setData} />
				<div className=' flex  '>
					<MostPlayedChampion data={data} />
					<MatchHistory data={data} />
				</div>
			</div>
		</div>
	)
}

export default Summoner
