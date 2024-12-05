/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-50',
    'bg-purple-50',
    'bg-pink-50',
    'bg-yellow-50',
    'bg-orange-50',
    'bg-indigo-50',
    'text-blue-500',
    'text-purple-500',
    'text-pink-500',
    'text-yellow-500',
    'text-orange-500',
    'text-indigo-500',
  ],
};