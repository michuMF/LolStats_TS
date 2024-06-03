import { useSummonerContext } from "@/context/useSummonerContext"
import { matchInfoProps } from "@/interfaces/types"
import { m } from "framer-motion"

const gamesSystem = [
	{ text: "All", queueId: "" },
	{ text: "Ranked Solo/Duo", queueId: "420" },
	{ text: "Ranked Flex", queueId: "440" },
]
const GameMods = ({
	setData,
	data,
}: {
	setData: React.Dispatch<React.SetStateAction<matchInfoProps | undefined>>
	data: matchInfoProps | undefined
}) => {
	const { summonerData } = useSummonerContext()

	console.log(summonerData?.matchArray.summonerInfo)

	const handleClick = game => {
		console.log(
			summonerData?.matchArray.summonerInfo.filter(match => match.queueId == "420")
		)
	}
	return (
		<div className='  w-full py-10  flex items-center justify-center gap-20 p-2  '>
			{gamesSystem.map((game, index) => (
				<div
					key={index}
					className='bg-victory text-white   text-center rounded-lg   '>
					<button onClick={() => handleClick(game.queueId)}>
						<h3 className='w-[400px] font-bold text-xl tracking-wider py-2  hover:bg-black transition-colors rounded-lg'>
							{game.text}
						</h3>
					</button>
				</div>
			))}
		</div>
	)
}

export default GameMods
