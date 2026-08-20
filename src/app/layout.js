// Next.js requires a root layout.js, but the real <html>/<body> only exists
// once, in [locale]/layout.js, since App Router allows only one <html>
// definition and [locale] wraps every real route.
export default function RootLayout({ children }) {
  return children;
}
