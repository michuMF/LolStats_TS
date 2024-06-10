/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],

	prefix: "",

	theme: {
		extend: {
			colors: {
				c: {
					1: "#112165",
					2: "#00E2B3",
					3: "#00BEC0",
					4: "#677381",
					black: "#000000",
					white: "#ffffff",
					victory: "#74A2FF",
					defeat: "#F57941",
				},
			},
		},
	},

	extend: {},
}
