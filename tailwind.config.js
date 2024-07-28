/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        enter: 'enter 0.5s ease-out forwards',
        leave: 'leave 0.5s ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        leave: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
