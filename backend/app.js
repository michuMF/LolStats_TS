import express from "express"
import cors from "cors"
import { env } from "process"

const app = express()
app.use(express.json())
app.use(cors())
app.listen(8800, () => {
	console.log("server is running")
})

app.get("/summoners/:name", async (req, res) => {
	const summonerName = req.params.name

	try {
		const response = await fetch(
			`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/MID?api_key=${env.VITE_LOL_API_KEY}`
		)

		const data = await response.json()

		res.status(200).contentType("application/json").send(data)
	} catch (error) {
		console.error(error)
		res.status(500).send("Internal Server Error")
	}
})
