import { Link } from "react-router-dom"

const navigation = [
	{ name: "Home", to: "/" },
	{ name: "Champions", to: "/Champions" },
	{ name: "Ranking", to: "/Ranking" },
]
const Header = () => {
	return (
		<header className='bg-c-2   w-full mx-auto p-6  font-serif '>
			<div className='container mx-auto flex items-center justify-between'>
				<h1 className='font-serif '>
					<span className='text-c-1 text-6xl'>L</span>O
					<span className='text-c-1 text-6xl'>L</span>
					STATS
				</h1>

				<nav>
					<ul className='flex gap-5 text-xl '>
						{navigation.map(({ name, to }) => (
							<li
								key={name}
								className='text-2xl hover:text-c-1 hover:scale-105 transition-all '>
								<Link className=' ' to={to}>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
