/** @type {DefaultColors} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  mode: 'jit',
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}"
  ],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      animation: {
        'pulse-short': 'pulse 1s ease-in-out 1',
        'fade-in' : "fadeIn .5s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      gridTemplateColumns: {
        'fill-200': 'repeat(auto-fit, minmax(220px, 1fr))'
      },
      screens: {
        'sm': {max: '768px'},
        'lg': {min: '769px'}
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        gray: colors.gray,
        slate: {
          50: colors.slate["50"],
          100: colors.slate["100"],
          200: colors.slate["200"],
          300: colors.slate["300"],
          400: colors.slate["400"],
          500: colors.slate["500"],
          600: colors.slate["600"],
          700: colors.slate["700"],
          750: "#273444",
          800: colors.slate["800"],
          900: colors.slate["900"],
        }
        // ...
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        lg: '15px',
        xl: '17px',
        '2xl': '22px',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
  }
}
