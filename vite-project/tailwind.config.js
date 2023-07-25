module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
    colors: {
      background: "#F8F6F2",
      text: "#1C1C1C66",
      search: "#EDEBE7",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
}
