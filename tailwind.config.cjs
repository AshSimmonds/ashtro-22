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
                    "h1, h2, h3, h4, h5, h6": {
                        "text-shadow": "0 0 10px accent",
                    },
					
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
                    "base-100": "#000d26",
                    "base-200": "#000F2e",
                    "base-300": "#000f4e",
                    "base-content": "#eeeeee",
                    info: "#414bb2",
                    success: "#9510ac",
                    warning: "#db663a",
                    error: "#f1c40f",
                    "bdheading":"#026087",
                    "bdpurple":"#9510ac",
                    "bdpink":"#d90368",
                    "bdorange": "#db663a",
                    "dbyellow":"#f1c40f",
                    "dbgreen":"#00cc66",
                    "bdblue":"414bb2",
                    "--border-color": "var(--b3)",
                    "--rounded-box": "0.2rem",
                    // "--rounded-btn": "20px 0 20px 0",
                    "--rounded-btn": "mask mask-hexagon",
                    // "--rounded-btn": "1px",
                    "--rounded-badge": "0.2rem",
                    "--animation-btn": "0.25s",
                    "--animation-input": ".2s",
                    // "--btn-text-case": "uppercase",
                    "--btn-focus-scale": "0.95",
                    "--navbar-padding": ".5rem",
                    "--border-btn": "1px",
                    "--tab-border": "1px",
                    "--tab-radius": "0.2rem",

                    "*": {
                        "border-color": "var(--border-color) !important",
                        "--tw-border-opacity": "1 !important",
                        "--tw-text-opacity": "1 !important",
                        "--tw-shadow": "0 0 0 1px var(--border-color) !important",
                    },
                },
            },
        ],
    },

}
