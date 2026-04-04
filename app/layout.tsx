import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Virtus Decora — Turnkey Construction & Architecture',
  description: 'Premium turnkey construction, architectural design, and interior furnishing. From concept to completion — across Europe and the Middle East.',
  openGraph: {
    title: 'Virtus Decora — Turnkey Construction & Architecture',
    description: 'Premium turnkey construction, architectural design, and interior furnishing.',
    images: [{ url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-obsidian text-slate-100 antialiased">{children}</body>
    </html>
  );
}
