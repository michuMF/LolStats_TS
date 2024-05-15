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
			c1: "#e7e247",
			c2: "#3d3b30",
			c3: "#4d5061",
			c4: "#5c80bc",
			c5: "#e9edde",
		},
	},
	extend: {},
}
