
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				serif: ["Playfair Display", "serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				hotel: {
					beige: "#F5F5F0",
					cream: "#FFFBF5",
					sand: "#E8E6DF",
					stone: "#A2A19E",
					charcoal: "#333333",
					gold: "#C9A87A",
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				fadeInUp: {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				slideInRight: {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				slideInLeft: {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				scaleIn: {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.7s ease-out forwards',
				'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
				'slide-in-right': 'slideInRight 0.7s ease-out forwards',
				'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
				'scale-in': 'scaleIn 0.5s ease-out forwards'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
			transitionTimingFunction: {
				'elegant': 'cubic-bezier(0.6, 0.01, 0.05, 0.95)',
			},
			boxShadow: {
				'elegant': '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.05)',
				'card': '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
				'button': '0 1px 2px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
