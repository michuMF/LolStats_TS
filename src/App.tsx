import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/pages/Root/Root.tsx"
import ErrorPage from "./error-page.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./components/pages/Home/Home.tsx"
import SummonerContextProvider from "./context/summonerContext.tsx"
import Summoner from "./components/pages/Summoner/Summoner.tsx"
import Ranking from "./components/pages/Ranking/Ranking.tsx"
import Champions from "./components/pages/Champions/Champions.tsx"
import Error from "./components/pages/Summoner/Error.tsx"
import ErrorContextProvider from "./context/errorContext.tsx"

console.log()

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
					errorElement: <Error />,
				},
				{
					path: "/Summoner",
					element: <Summoner />,
					errorElement: <Error />,
				},
				{
					path: "/Ranking",
					element: <Ranking />,
					errorElement: <Error />,
				},
				{
					path: "/Champions",
					element: <Champions />,
					errorElement: <Error />,
				},
			],
		},
	])
	return (
		<QueryClientProvider client={queryClient}>
			<SummonerContextProvider>
				<ErrorContextProvider>
					<RouterProvider router={router} />
				</ErrorContextProvider>
			</SummonerContextProvider>
		</QueryClientProvider>
	)
}

export default App
