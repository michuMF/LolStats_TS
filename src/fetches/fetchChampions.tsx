import { champion, championDetails } from "@/interfaces/interfaces"

interface dataProps {
	data: championDetails[]
}

export const fetchAllChampion = async (
	champions: champion[]
): Promise<championDetails[] | undefined> => {
	if (champions) {
		const championPoints = champions.map(({ championPoints }) => championPoints)

		console.log(championPoints)

		try {
			const response = await fetch(
				"https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json"
			)

			const data: dataProps = await response.json()

			const filteredChampions = Object.entries(data.data).filter(([, value]) =>
				champions.some(({ championId }) => value.key == championId)
			)

			const champions2: championDetails[] = filteredChampions.map(([, value]) => ({
				...value,
			}))

			return champions2
		} catch (err) {
			console.error(err)
		}
	}
}
