import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from './store/provider'

export const metadata: Metadata = {
  title: "Blog Demo - Next.js + Drupal + Redux",
  description: "Full Stack demo con Redux Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}