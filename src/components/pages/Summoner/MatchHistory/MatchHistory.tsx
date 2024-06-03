import { useSummonerContext } from "@/context/useSummonerContext"
import SummonerStats from "./SummonerStats/SummonerStats"
import PlayersFromMatch from "./PlayersFromMatch"
import { useState } from "react"

import MoreMatchInfo from "./MoreMatchInfo/MoreMatchInfo"
import { matchInfoProps } from "@/interfaces/types"

type VisibleContentState = {
	[key: number]: boolean
}

const MatchHistory = ({ data }: { data: matchInfoProps }) => {
	const [show, setShow] = useState<VisibleContentState>({})

	const { summonerData } = useSummonerContext()

	const toggleContent = (index: number) => {
		setShow(prevState => ({
			...prevState,
			[index]: !prevState[index],
		}))
	}

	return (
		summonerData && (
			<div className='flex-1  '>
				{data.summonerInfo.map((match, index) => (
					<div
						key={index}
						className={`relative ${match?.win ? "bg-victory" : "bg-defeat"}}`}>
						<div
							className={` relative  border-b border-white flex gap-5 p-1 py-2 ${
								match?.win ? "bg-victory" : "bg-defeat"
							}`}>
							<SummonerStats match={match} count={index} />
							<PlayersFromMatch count={index} />
						</div>
						<MoreMatchInfo show={show} toggleContent={toggleContent} index={index} />
					</div>
				))}
			</div>
		)
	)
}

export default MatchHistory
