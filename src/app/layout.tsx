// mpos-app/src/app/layout.tsx
import './globals.css' // Importing the global styles

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {children} {/* Render the children components */}
      </body>
    </html>
  )
}
