import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

import { Nav } from "@/components/nav"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Brandon Weng",
  description: "Blog about software engineering, startups, and more.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <Nav />
              </div>
            </header>
            <main>{children}</main>
          </div>
            <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
