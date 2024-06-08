import { matchInfoProps, participants } from "@/types/types"

const MatchStatus = ({
	match,
	count,
	data,
}: {
	match: participants
	count: number
	data: matchInfoProps | undefined
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

	return (
		data && (
			<div className='flex flex-col gap-2 items-center '>
				<div className='text-center space-y-1  '>
					<p
						className={`${
							match.win ? "text-blue-800" : "text-red-800 "
						} text-xl font-semibold`}>
						{data?.matchInfo[count][0].queueId == 420 ? "Ranked Solo" : "Ranked Flex"}
					</p>
					<p className='text-[#ffffff]'>
						{formatData(data?.matchInfo[count][0].gameEndTimestamp)} days ago
					</p>
				</div>
				<div className='w-4/5 mx-auto h-[1px]  bg-c5 '></div>
				<div className='text-center'>
					<p className={`text-xl ${match.win ? "text-blue-800" : "text-red-800"}`}>
						{match.win ? "Victory" : "Defeat"}
					</p>
					<p className=''>{formatTime(data?.matchInfo[count][0].gameDuration)}</p>
				</div>
			</div>
		)
	)
}

export default MatchStatus
