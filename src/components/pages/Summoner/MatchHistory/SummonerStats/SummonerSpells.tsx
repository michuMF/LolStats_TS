import { useSummonerContext } from "@/context/useSummonerContext"
import { participants } from "@/types/types"

const SummonerSpells = ({
	count,
	match,
}: {
	count: number
	match: participants
}) => {
	const { summonerData } = useSummonerContext()

	return (
		<div className='flex'>
			<div>
				<img width={42} src={`./spell/${match.summoner1Id.id}.png`} alt='' />
				<img width={42} src={`./spell/${match.summoner2Id.id}.png`} alt='' />
			</div>
		</div>
	)
}

export default SummonerSpells
