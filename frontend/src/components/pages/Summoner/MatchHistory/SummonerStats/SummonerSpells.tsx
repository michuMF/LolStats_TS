import { participants } from "@/types/types"

const SummonerSpells = ({ match }: { count: number; match: participants }) => {
	return (
		<div className='flex'>
			<div>
				<img
					width={42}
					src={`./spell/${
						typeof match.summoner1Id === "object"
							? match.summoner1Id.id
							: match.summoner1Id
					}.png`}
					alt=''
				/>
				<img
					width={42}
					src={`./spell/${
						typeof match.summoner2Id === "object"
							? match.summoner2Id.id
							: match.summoner2Id
					}.png`}
					alt=''
				/>
			</div>
		</div>
	)
}

export default SummonerSpells
