import { Link } from "react-router-dom"

const navigation = [
	{ name: "Home", to: "/" },
	{ name: "Champions", to: "/Champions" },
	{ name: "Ranking", to: "/Ranking" },
	{ name: "About", to: "/About" },
	{ name: "Contact", to: "/Contact" },
]
const Header = () => {
	return (
		<header className='bg-c2   container mx-auto px-4 py-2 flex items-center justify-between'>
			<h1>LOLSTATS</h1>

			<nav>
				<ul className='flex gap-5 text-xl '>
					{navigation.map(({ name, to }) => (
						<li
							key={name}
							className='text-2xl hover:text-c1 hover:scale-105 transition-all '>
							<Link className=' ' to={to}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Header
