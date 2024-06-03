import { participants } from "@/interfaces/types"

const SummonerPlayedChampion = ({ match }: { match: participants }) => {
	return (
		<div className='relative'>
			<img
				className=' rounded-full '
				src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${match.championName}.png`}
			/>
			<div className='absolute bottom-0 right-0 bg-[#04052e] text-[#ffffff] px-2 py-1 rounded-full'>
				{match.champLevel}
			</div>
		</div>
	)
}

export default SummonerPlayedChampion
