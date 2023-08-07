module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {},
    animation: {
      'spin-fast': 'spin 0.4s linear infinite',
    },
    colors: {
      background: '#F8F6F2',
      text: '#1C1C1C66',
      search: '#EDEBE7',
    },
  },
  variants: {
    extend: {},
  },
  safeList: ['bg-red-500', 'bg-yellow-500', 'bg-green-500'],
  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
}
