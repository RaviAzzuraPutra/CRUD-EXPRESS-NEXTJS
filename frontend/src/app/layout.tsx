import "./globals.css";
export const metadata = {
  title: 'CRUD with images',
  description: 'Generated by Next.js',
  icons: {
    icon: "/img/ICON.jpg"
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Kablammo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-lime-100 to-lime-600">{children}</body>
    </html>
  )
}
