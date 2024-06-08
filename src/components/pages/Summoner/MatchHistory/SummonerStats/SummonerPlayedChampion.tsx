import { participants } from "@/types/types"

const SummonerPlayedChampion = ({ match }: { match: participants }) => {
	return (
		<div className='relative'>
			<img
				width={150}
				className=' rounded-xl '
				src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${match.championName}.png`}
			/>
			<div
				className={`absolute bottom-8  right-0 ${
					match.win ? "bg-blue-800" : "bg-red-800"
				} text-[#ffffff] px-2 py-1 rounded-full`}>
				{match.champLevel}
			</div>
		</div>
	)
}

export default SummonerPlayedChampion
