import background from "../../../assets/errorPage/background.png"
import loading from "../../../assets/Loading/Loading.png"

import jinx from "../../../assets/errorPage/Jinx.png"

const Loading = () => {
	return (
		<section
			style={{
				backgroundImage: `url('${background}')`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
			id='error'
			className='container mx-auto h-[calc(100vh-110px)] overflow-hidden '>
			<div className='w-full h-full bg-c-1 bg-opacity-80 py-20'>
				<div className=' relative w-full h-full '>
					<img width={1600} className='absolute top-1/3 ' src={loading} alt='' />

					<img
						width={1600}
						className='absolute -top-[100px] -left-[400px]'
						src={jinx}
						alt=''
					/>
				</div>
			</div>
		</section>
	)
}

export default Loading
