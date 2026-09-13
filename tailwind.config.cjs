/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vapor: {
          bg: "#030308",
          surface: "#0a0a12",
          elevated: "#111118",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#8b8fa3",
          text: "#e8e8ef",
          cyan: "#00e5ff",
          violet: "#a855f7",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(0, 229, 255, 0.35)",
        "glow-violet": "0 0 40px -10px rgba(168, 85, 247, 0.35)",
        card: "0 8px 32px -8px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "vapor-gradient":
          "linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(168, 85, 247, 0.12) 50%, rgba(236, 72, 153, 0.08) 100%)",
        "vapor-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 229, 255, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168, 85, 247, 0.1), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
