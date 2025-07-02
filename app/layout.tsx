import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Roboto } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import NavBar from './components/NavBar'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','700'], variable: '--font-heading' });
const roboto   = Roboto({ subsets: ['latin'],    weight: ['400','700'], variable: '--font-body' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Caprise Brock - Portfolio',
  description: 'Freelance web developer specializing in HTML, CSS, and responsive design',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    // No custom colors, use Tailwind's default black, white, and gray
                  },
                  fontFamily: {
                    heading: ['var(--font-heading)', 'serif'],
                    body:    ['var(--font-body)',    'sans-serif'],
                  },
                }
              }
            }
          `}
        </Script>
      </head>
      <body className="font-body bg-black text-white">
        <NavBar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  )
} 