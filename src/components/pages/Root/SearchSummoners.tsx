import { fetchSummoner } from "@/fetches/fetchSummoner"
import { useState } from "react"

import { IoSearchOutline } from "react-icons/io5"

const SearchSummoners = () => {
	const [data, setData] = useState({})
	const [name, setName] = useState("")

	return <div className='flex flex-col items-center gap-4 w-80 mx-auto  '></div>
}
export default SearchSummoners
