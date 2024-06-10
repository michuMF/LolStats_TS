const SummonerKDA = ({
	death,
	kill,
	assist,
	kda,
}: {
	death: number
	kill: number
	assist: number
	kda: number
}) => {
	return (
		<div>
			{kill} / {death} / {assist}
			<p className='text-center font-semibold'>{kda.toFixed(2)}</p>
		</div>
	)
}

export default SummonerKDA
