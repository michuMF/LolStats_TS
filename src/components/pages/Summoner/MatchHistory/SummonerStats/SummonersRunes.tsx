import { useSummonerContext } from "@/context/useSummonerContext"
import blankSquare from "../../../../../assets/epmtyitemslot.png"
const SummonersRunes = ({ count }: { count: number }) => {
	const { summonerData } = useSummonerContext()

	return (
		<div className=' flex flex-col items-center gap-1'>
			{summonerData?.summonerMainRunesFromMatch[count]?.icon ? (
				<img
					width={50}
					src={`./${summonerData?.summonerMainRunesFromMatch[count].icon}`}
					alt=''
				/>
			) : (
				<div className=' '>
					<img
						width={50}
						src={blankSquare}
						alt="runes don't exist anymore"
						className='rounded-full opacity-40'
					/>
				</div>
			)}

			{summonerData?.summonerSecondaryRunesFromMatch[count]?.icon ? (
				<img
					src={`./${summonerData?.summonerSecondaryRunesFromMatch[count].icon}`}
					alt=''
				/>
			) : (
				""
			)}
		</div>
	)
}

export default SummonersRunes
