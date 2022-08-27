/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backdropBrightness: {
				25: ".25",
			},
			colors: require("daisyui/src/colors"),
		},
	},

	corePlugins: {
		// preflight: false,
	},

	plugins: [
		require('@tailwindcss/typography'),
		require("daisyui")
		// ...
	],
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		themes: [

			{

				ashdark: {

					primary: "#026087",
					"primary-focus": "#33ff33",
					"primary-content": "#1b1c22",
					secondary: "#00cc66",
					"secondary-focus": "#b030fe",
					"secondary-content": "#1b1c22",
					accent: "#d90368",
					"accent-focus": "#ff9326",
					"accent-content": "#1b1c22",
					neutral: "#eeeeee",
					"neutral-focus": "#c0d3ff",
					"neutral-content": "#1b1c22",
					"base-100": "#021001",
					"base-200": "#042002",
					"base-300": "#073003",
					"base-content": "#4ae9ff",
					info: "#414bb2",
					success: "#9510ac",
					warning: "#db663a",
					error: "#f1c40f",

				},
			},
		],
	},

}
