import { useSummonerContext } from "@/context/useSummonerContext"

const SummonerSpells = ({ count }: { count: number }) => {
	const { summonerData } = useSummonerContext()

	return (
		<div className='flex'>
			<div>
				<img
					width={42}
					src={`./spell/${summonerData?.summonerSpells.summonerSpellUsesBySummonerD[count][0].id}.png`}
					alt=''
				/>
				<img
					width={42}
					src={`./spell/${summonerData?.summonerSpells.summonerSpellUsesBySummonerF[count][0].id}.png`}
					alt=''
				/>
			</div>
		</div>
	)
}

export default SummonerSpells
