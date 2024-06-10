import { useSummonerContext } from "@/context/useSummonerContext"
import SummonerStats from "./SummonerStats/SummonerStats"
import PlayersFromMatch from "./PlayersFromMatch"
import { useState } from "react"

import MoreMatchInfo from "./MoreMatchInfo/MoreMatchInfo"
import { matchInfoProps, participants } from "@/types/types"

type VisibleContentState = {
	[key: number]: boolean
}

const MatchHistory = ({ data }: { data: matchInfoProps | undefined }) => {
	const [show, setShow] = useState<VisibleContentState>({})

	const { summonerData } = useSummonerContext()
	console.log(summonerData)

	const toggleContent = (index: number) => {
		setShow(prevState => ({
			...prevState,
			[index]: !prevState[index],
		}))
	}

	return (
		data && (
			<div className='flex-1  space-y-2 px-2  '>
				{data.summonerInfo.map((match, index) => (
					<div
						key={index}
						className={`relative  ${match?.win ? "bg-c-victory" : "bg-c-defeat"}}`}>
						<div
							className={` relative rounded-xl   border-b border-white flex gap-5 p-1 py-2 ${
								match?.win ? "bg-c-victory" : "bg-c-defeat"
							}`}>
							<SummonerStats data={data} match={match} count={index} />
							<PlayersFromMatch match={match} count={index} data={data} />
						</div>
						<MoreMatchInfo
							data={data}
							show={show}
							toggleContent={toggleContent}
							index={index}
						/>
					</div>
				))}
			</div>
		)
	)
}

export default MatchHistory
