module.exports = {
  plugins: [
    "tailwindcss",
    "@tailwindcss/jit",
    "postcss-import",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
  // plugins: {
  //   "@tailwindcss/jit": {},
  //   autoprefixer: {},
  // },
};
