/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yell: "#D79300",
        yellLight: "#EFA400",
        gray: "#A6BCC6",
        blue: "#1A9DD0",
        grey: "#6D6D6D",
        smooth: "#3C3C3C",
        grayBlue: "#799BAA",
        grayLight: "#545454",
        blueLight: "#0092CB",
        blueDark: "#36697F",
        black: "#000000",
        red: "#cb1800",
      },
      screens: {
        ldt: { max: "1350px" },
        dt: { max: "1300px" },
        lt: { max: "1024px" },
        nlt: { max: "950px" },
        slt: { max: "768px" },
        tb: { max: "660px" },
        mbl: { max: "480px" },
        nmbl: { max: "460px" },
        smbl: { max: "410px" },
      },
      outlineWidth: {
        'none': '0'
      }
    },
    margin: {
      0: "0px",
      10: "10px",
      20: "20px",
      30: "30px",
      40: "40px",
      45: "45px",
      50: "50px",
      80: "80px",
      auto: "auto",
    },
    padding: {
      0: "0px",
      10: "10px",
      20: "20px",
      30: "30px",
      40: "40px",
      80: "80px",
    },
    backgroundColor: {
      def: "#205871",
      dark: "#36697F",
      blue: "#1A9DD0",
      gray: "#F6F7F7",
      darkGray: "#D2DEE3",
      inherit: "inherit",
      },
    fontSize: {
      14: "14px",
      16: "16px",
      18: "18px",
      24: "24px",
      36: "36px",
    },
    borderRadius: {
      10: "10px",
    },
  },
  plugins: [],
};
