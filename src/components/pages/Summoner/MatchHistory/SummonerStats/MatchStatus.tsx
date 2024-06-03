import { useSummonerContext } from "@/context/useSummonerContext"
import { participants } from "@/interfaces/types"

const MatchStatus = ({
	match,
	count,
}: {
	match: participants
	count: number
}) => {
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
	const { summonerData } = useSummonerContext()
	return (
		summonerData && (
			<div className='flex flex-col gap-2 items-center'>
				<div>
					<p className='text-center'>
						{summonerData?.matchArray.matchInfo[count][0].queueId == "420"
							? "Ranked Solo"
							: "Ranked Flex"}
					</p>
					<p className='text-[#ffffff]'>
						{formatData(
							summonerData?.matchArray.matchInfo[count][0].gameEndTimestamp
						)}{" "}
						days ago
					</p>
				</div>
				<div className='w-4/5 mx-auto h-[1px]  bg-c5 '></div>
				<div>
					<p>{match.win ? "Victory" : "Defeat"}</p>
					<p className=''>
						{formatTime(summonerData?.matchArray.matchInfo[count][0].gameDuration)}
					</p>
				</div>
			</div>
		)
	)
}

export default MatchStatus
