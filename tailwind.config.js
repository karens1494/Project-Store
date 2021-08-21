module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: ["Times New Roman", "Georgia"],
      mono: ["Monaco", "ui-monospace", "SFMono-Regular"],

      header: ["Roboto"],
    },

    container: {
      center: true,
      xl: "700px",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      header: "#2CAFEF",
      body: "#E5E5E5",
      facebook: "#0D8BF0",
      google: "#C4C4C4",
    }),
    extend: {
      backgroundImage: () => ({
        login: "url('./images/background-white.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
};
