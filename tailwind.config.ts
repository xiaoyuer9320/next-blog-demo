import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 告诉 Tailwind 去哪里找 class
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // 👇 这就是让 Markdown 变漂亮的插件
    require('@tailwindcss/typography'),
  ],
};
export default config;