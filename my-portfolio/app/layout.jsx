import './globals.css'

export const metadata = {
  title: 'Viviandev — Ecommerce Developer',
  description: 'Vivian builds considered Shopify and headless ecommerce storefronts for vendors, brands, and agencies.',
}

export const viewport = { colorScheme: 'light', themeColor: '#f8f3eb' }

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
