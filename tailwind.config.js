/** @type {import('tailwindcss').Config} */
export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
  "./app.vue",
];
export const theme = {
  container: {
    screens:{
      sm:"100%",
      md: '100%',
      lg:"960px",
      xl:"1140px",
      '2xl':"1320px"
    }
  },
  extend: {
    flex:{
      "0-auto":"0 0 auto"
    }
  },
};
export const plugins = [];

