import express from "express"
import cors from "cors"
import { env } from "process"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", (req, res) => {
	res.send("Servers is Running")
})
app.listen(8800, () => {
	console.log("server is running")
})

app.get("/summoners/:name/:tag", async (req, res) => {
	const summonerName = req.params.name
	const summonerTag = req.params.tag

	try {
		const response = await fetch(
			`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${env.VITE_LOL_API_KEY}`
		)

		const data = await response.json()

		res.status(200).contentType("application/json").send(data)
	} catch (error) {
		console.error(error)
		res.status(500).send("Internal Server Error")
	}
})