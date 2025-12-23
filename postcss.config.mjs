/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // 👇 v4 必须用这个插件，而不是普通的 'tailwindcss'
    '@tailwindcss/postcss': {},
  },
};

export default config;