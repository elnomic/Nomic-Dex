/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark': '#000000',
        'surface': '#1A1A1A',
        'surface-elevated': '#2A2A2A',
        'primary': '#0066FF',
        'success': '#00D884',
        'danger': '#FF3355',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8A8A8A',
      }
    }
  },
  plugins: []
}
