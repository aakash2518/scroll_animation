import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IntroLoader from '@/components/ui/IntroLoader';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'TEJ AUTOSYSTEM PVT. LTD. | Industrial Automation & Conveyor Systems',
  description: 'Since 2004, TAPL manufactures premium conveyor systems, assembly lines, industrial workstations & material handling solutions. Based in Faridabad, India.',
  keywords: ['industrial automation', 'conveyor systems', 'assembly line', 'material handling', 'TAPL', 'Tej Autosystem', 'Faridabad', 'India'],
  openGraph: {
    title: 'TEJ AUTOSYSTEM PVT. LTD. | Industrial Automation',
    description: 'Premium conveyor systems, assembly lines & industrial automation solutions engineered for modern manufacturing.',
    url: 'https://www.taplindia.net',
    siteName: 'TAPL India',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.taplindia.net' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased bg-[var(--background)] text-white selection:bg-[#0077B6] selection:text-white`}>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <IntroLoader />
        <SmoothScroll>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
