import { fetchRanking } from "@/fetches/fetchRanking"

const Ranking = () => {
	return (
		<section aria-label='Ranking' className='container mx-auto'>
			<button
				onClick={() => fetchRanking()}
				className='mt-20 p-4 bg-c2 rounded-xl'>
				Ranking
			</button>
		</section>
	)
}

export default Ranking
