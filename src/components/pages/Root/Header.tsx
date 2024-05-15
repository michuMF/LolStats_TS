import { useSummonerContext } from "@/context/useSummonerContext"
import { fetchSummoner } from "@/fetches/fetchSummoner"
import { useState } from "react"

const Header = () => {
	const [value, setValue] = useState("michuMF")
	const { setSummonerData } = useSummonerContext()

	return (
		<header className='text-c1  container mx-auto px-4 py-2 flex items-center justify-between'>
			<h1>LOLSTATS</h1>
			<div>
				<input
					type='text'
					placeholder='Summoners Name '
					className='px-4 py-2 w-[400px]'
					onChange={e => setValue(e.target.value)}
				/>

				<button
					onClick={() => {
						fetchSummoner(value).then(res => setSummonerData(res))
					}}
					className='bg-c4 text-c1 px-4 py-2'>
					Search
				</button>
			</div>
			<nav>
				<ul className='flex gap-5 text-xl '>
					<li>Summoner</li>
					<li>Contact Me</li>
					<li>About</li>
					<li>Hello</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
