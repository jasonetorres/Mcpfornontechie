/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        matrix: {
          primary: "hsl(var(--matrix-primary))",
          secondary: "hsl(var(--matrix-secondary))",
          accent: "hsl(var(--matrix-accent))",
          muted: "hsl(var(--matrix-muted))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "matrix-rain": "matrix-rain 3s linear infinite",
        "matrix-glow": "matrix-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.6s ease-out",
        "slide-in-top": "slide-in-top 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
        "slide-in-left": {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
        "slide-in-bottom": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "slide-in-top": {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 }
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { transform: "translateY(100vh)", opacity: 0 }
        },
        "matrix-glow": {
          "0%, 100%": { 
            textShadow: "0 0 5px hsl(var(--matrix-primary)), 0 0 10px hsl(var(--matrix-primary)), 0 0 15px hsl(var(--matrix-primary))" 
          },
          "50%": { 
            textShadow: "0 0 10px hsl(var(--matrix-secondary)), 0 0 20px hsl(var(--matrix-secondary)), 0 0 30px hsl(var(--matrix-secondary))" 
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--matrix-primary))',
              '&:hover': {
                color: 'hsl(var(--matrix-secondary))',
              },
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            code: {
              color: 'hsl(var(--matrix-primary))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--border))',
            },
          },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 0, 0.2)',
        'glow-md': '0 0 20px rgba(0, 255, 0, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 255, 0, 0.4)',
      },
    },
  },
  plugins: [],
};