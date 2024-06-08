import background from "../../../assets/errorPage/background.png"
import errorMessage1 from "../../../assets/errorPage/404PAGE.png"
import errorMessage2 from "../../../assets/errorPage/NOTFOUND.png"
import jinx from "../../../assets/errorPage/Jinx.png"
import { Link } from "react-router-dom"

const Error = () => {
	return (
		<section
			style={{
				backgroundImage: `url('${background}')`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
			id='error'
			className='container mx-auto h-[calc(100vh-64px)] overflow-hidden '>
			<div className='w-full h-full bg-c-1 bg-opacity-80 py-20'>
				<div className=' relative w-full h-full '>
					<img
						width={1600}
						className='absolute top-1/2'
						src={errorMessage1}
						alt=''
					/>
					<img width={1600} className='absolute top-0' src={errorMessage2} alt='' />
					<img
						width={1600}
						className='absolute -top-[100px] left-[200px]'
						src={jinx}
						alt=''
					/>
					<div className='absolute bottom-10 left-[100px]'>
						<Link
							to={"/"}
							className=' relative   bg-white px-8 py-4 font-bold text-3xl'>
							<div className='absolute w-full h-full border border-black -top-2 -left-2 rounded-tl-xl'>
								{" "}
							</div>
							BACK TO HOME
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Error
