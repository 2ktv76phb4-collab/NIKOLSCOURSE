import './globals.css'

export const metadata = {
  title: 'NIKOLil — קורס מתחילות',
  description: 'קורס לק ג\'ל ומבנה אנטומי למתחילות מ-0',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/images/nikol-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Assistant:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
