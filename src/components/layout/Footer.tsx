import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] relative">
      {/* Top orange accent line */}
      <div className="w-full h-1 bg-[#4a50c8]"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Logo + About */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="w-40 h-20 relative">
                <Image src="/OMlogo.png" alt="OM Logo" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Incepted in the year 2004, Tej Autosystem Pvt. Ltd. is one of the well-known organizations in manufacturing and supplying conveyors, assembly lines, and industrial workstations.
            </p>
          </div>
          
          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-[#4a50c8]"></div>
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/about-us" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> About Us</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Products</Link></li>
              <li><Link href="/profile" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Company Profile</Link></li>
              <li><Link href="/career" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Career</Link></li>
              <li><Link href="/our-clients" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Our Clients</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Col 3: Our Products */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-[#4a50c8]"></div>
              OUR PRODUCTS
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Assembly Conveyor</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Assembly Work Stations</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Inclined Conveyor</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Roller Conveyors</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> LED Aging Racks</Link></li>
              <li><Link href="/products" className="hover:text-[#4a50c8] transition-colors flex items-center gap-2"><span className="text-[#4a50c8] text-xs">›</span> Mesh Conveyors</Link></li>
            </ul>
          </div>
          
          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-4 h-[2px] bg-[#4a50c8]"></div>
              CONTACT US
            </h4>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#4a50c8] w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Plot No. 353, Sector-68,<br/>IMT Faridabad -121004,<br/>Haryana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#4a50c8] w-4 h-4 flex-shrink-0" />
                <div>
                  <a href="tel:+919711415164" className="block hover:text-white transition-colors">+91 9711 415 164</a>
                  <a href="tel:+918053650222" className="block hover:text-white transition-colors">+91 8053 650 222</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#4a50c8] w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@taplindia.net" className="hover:text-white transition-colors">info@taplindia.net</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2024 Tej Autosystem Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Designed By <a href="https://www.omsoftsolution.com/" className="font-bold text-[#4a50c8] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Om Soft Solution</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
