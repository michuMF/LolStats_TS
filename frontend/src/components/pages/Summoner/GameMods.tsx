import { useSummonerContext } from "@/context/useSummonerContext"
import { matchInfoProps } from "@/types/types"

const gamesSystem = [
	{ text: "All", queueId: "" },
	{ text: "Ranked Solo/Duo", queueId: "420" },
	{ text: "Ranked Flex", queueId: "440" },
]
const GameMods = ({
	setData,
}: {
	setData: React.Dispatch<React.SetStateAction<matchInfoProps | undefined>>
	data: matchInfoProps | undefined
}) => {
	const { summonerData } = useSummonerContext()

	const handleClick = (game: string) => {
		if (game === "420") {
			setData(summonerData?.matchArray.rankedGames)
		} else if (game === "440") {
			setData(summonerData?.matchArray.flexGames)
		} else {
			setData(summonerData?.matchArray.allGames)
		}
	}
	return (
		<div className='  w-full py-10  flex items-center justify-center gap-20 p-2 px-10 container '>
			{gamesSystem.map((game, index) => (
				<div
					key={index}
					className='bg-c-2 text-c-1   text-center rounded-lg flex w-full  items-center justify-center hover:bg-c-1 hover:text-c-2 transition-colors    '>
					<button className='w-full' onClick={() => handleClick(game.queueId)}>
						<h3 className=' flex-1 font-bold text-xl tracking-wider py-2   '>
							{game.text}
						</h3>
					</button>
				</div>
			))}
		</div>
	)
}

export default GameMods
