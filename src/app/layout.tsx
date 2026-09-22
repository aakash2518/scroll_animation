import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

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
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased bg-[var(--background)] text-white selection:bg-[#0077B6] selection:text-white`}>
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
