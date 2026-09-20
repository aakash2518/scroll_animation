import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

import IntroLoader from '@/components/ui/IntroLoader';

export const metadata: Metadata = {
  title: 'TEJ AUTOSYSTEM PVT. LTD. | Industrial Automation',
  description: 'Industrial automation, conveyor systems and material handling solutions engineered for modern manufacturing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[var(--background)] text-white selection:bg-[#0A4174] selection:text-white`}>
        <IntroLoader />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
