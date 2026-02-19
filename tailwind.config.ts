import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "selector",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // Ensure root components are scanned
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
export default config;
