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
		colors: {
			c1: "#112165",
			c2: "#00E2B3",
			c3: "#00BEC0",
			c4: "#677381",
			c5: "#000000",
			victory: "#10B4D4",
			defeat: "#D22525",
		},
	},
	extend: {},
}
