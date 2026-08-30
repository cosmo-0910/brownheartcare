/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#b0004a",
        "primary-container": "#d81b60",
        "on-primary": "#ffffff",
        "on-primary-container": "#fff2f3",
        "inverse-primary": "#ffb2bf",
        "primary-fixed": "#ffd9de",
        "primary-fixed-dim": "#ffb2bf",
        "on-primary-fixed": "#3f0016",
        "on-primary-fixed-variant": "#90003b",

        "secondary": "#5f5e5e",
        "secondary-container": "#e4e2e1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#656464",
        "secondary-fixed": "#e4e2e1",
        "secondary-fixed-dim": "#c8c6c6",
        "on-secondary-fixed": "#1b1c1c",
        "on-secondary-fixed-variant": "#474747",

        "tertiary": "#64535a",
        "tertiary-container": "#7e6b72",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fff2f5",
        "tertiary-fixed": "#f4dce4",
        "tertiary-fixed-dim": "#d7c1c8",
        "on-tertiary-fixed": "#25181e",
        "on-tertiary-fixed-variant": "#524249",

        "surface": "#f9f9f9",
        "surface-bright": "#f9f9f9",
        "surface-dim": "#dadada",
        "surface-variant": "#e2e2e2",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-tint": "#bc004f",

        "on-surface": "#1a1c1c",
        "on-surface-variant": "#5a4044",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f1f1f1",

        "outline": "#8e6f74",
        "outline-variant": "#e3bdc3",
        "background": "#f9f9f9",
        "on-background": "#1a1c1c",

        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(90, 64, 68, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(176, 0, 74, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
