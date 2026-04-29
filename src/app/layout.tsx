import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import '@/app/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branded Shopping | Luxury E-commerce',
  description: 'The future of luxury shopping, powered by AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
