import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/pages/Root/Root.tsx"
import ErrorPage from "./error-page.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./components/pages/Home/Home.tsx"
import SummonerContextProvider from "./context/summonerContext.tsx"

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
