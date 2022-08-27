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

					'primary': '#44b022',
					'primary-focus': '#00ff00',
					'primary-content': '#ffffff',

					'secondary': '#721eaf',
					'secondary-focus': '#ae00ff',
					'secondary-content': '#ffffff',

					'accent': '#ae9822',
					'accent-focus': '#ffdd00',
					'accent-content': '#ffffff',

					'neutral': '#102e88',
					'neutral-focus': '#0038c7',
					'neutral-content': '#ffffff',

					'base-100': '#021001',
					'base-200': '#042002',
					'base-300': '#073003',
					'base-content': '#4ae9ff',

					'info': '#384fff',
					'success': '#87cf3a',
					'warning': '#ffb347',
					'error': '#ff1a1a',

					'--rounded-box': '0.25rem',
					'--rounded-btn': '0.1rem',
					'--rounded-badge': '0.1rem',

					'--animation-btn': '0.25s',
					'--animation-input': '0.2s',

					// '--btn-text-case': 'uppercase',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
				},
			},
		],
	},

}
