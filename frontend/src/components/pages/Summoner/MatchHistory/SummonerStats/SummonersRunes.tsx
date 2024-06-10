import { useSummonerContext } from "@/context/useSummonerContext"
import blankSquare from "../../../../../assets/epmtyitemslot.png"
import { participants } from "@/types/types"
const SummonersRunes = ({
	count,
	match,
}: {
	count: number
	match: participants
}) => {
	const { summonerData } = useSummonerContext()

	return (
		<div className=' flex flex-col items-center gap-1'>
			{match.runes ? (
				<img
					width={43}
					className='bg-black rounded-full'
					src={`./${match.runes?.icon}`}
					alt=''
				/>
			) : (
				<div className=' '>
					<img
						width={43}
						src={blankSquare}
						alt="runes don't exist anymore"
						className='rounded-full opacity-40'
					/>
				</div>
			)}

			{summonerData ? (
				<img
					width={40}
					className='bg-black rounded-full'
					src={`./${match.secondaryRunes.icon}`}
					alt=''
				/>
			) : (
				""
			)}
		</div>
	)
}

export default SummonersRunes
