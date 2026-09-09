import './globals.css'

export const metadata = {
  title: 'Nail Artistry - קורס ציפורניים מקצועי',
  description: 'קורס ציפורניים עם ניקול איליבסקי - בסיס מקצועי וליווי נמשך למתחילות',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
