import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/pages/Root/Root.tsx"
import ErrorPage from "./error-page.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./components/pages/Home/Home.tsx"
import SummonerContextProvider from "./context/summonerContext.tsx"
import Summoner from "./components/pages/Summoner/Summoner.tsx"
import Ranking from "./components/pages/Ranking/Ranking.tsx"
import Champions from "./components/pages/Champions/Champions.tsx"

function App() {
	const queryClient = new QueryClient()

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/Summoner",
					element: <Summoner />,
				},
				{
					path: "/Ranking",
					element: <Ranking />,
				},
				{
					path: "/Champions",
					element: <Champions />,
				},
			],
		},
	])
	return (
		<QueryClientProvider client={queryClient}>
			<SummonerContextProvider>
				<RouterProvider router={router} />
			</SummonerContextProvider>
		</QueryClientProvider>
	)
}

export default App
