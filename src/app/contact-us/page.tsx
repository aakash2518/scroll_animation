'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import LiquidMesh from '@/components/3d/LiquidMesh';

export default function ContactUsPage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* 3D Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[0, 10, 5]} intensity={2} color="#49769F" />
              <directionalLight position={[-5, 5, 5]} intensity={1} color="#0A4174" />
              <LiquidMesh />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505] pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          <h4 className="text-[#49769F] font-bold tracking-widest text-sm mb-4 uppercase">Get In Touch</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase drop-shadow-2xl">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Request For Free Quote</h2>
              <p className="text-gray-400 mb-8">
                For Business: For Business inquiry fill our feedback form and Phone Number - (+91) 9711 415 164, our team will help you within 24 hours.
              </p>
              
              <form className="space-y-6">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#49769F] transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#49769F] transition-colors" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#49769F] transition-colors" />
                <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#49769F] transition-colors"></textarea>
                <button type="button" className="bg-[#49769F] text-white px-10 py-4 font-bold tracking-widest text-sm hover:bg-transparent border border-[#49769F] transition-colors w-full">
                  SUBMIT NOW
                </button>
              </form>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="p-10 border border-white/10 bg-[#0a0a0a] h-full">
                <h3 className="text-xl font-bold mb-8 uppercase tracking-wider border-b border-white/10 pb-4">Corporate Office</h3>
                <ul className="space-y-8">
                  <li>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Address</h4>
                    <p className="text-white text-lg">Plot No. 353, Sector-68,<br/>IMT Faridabad -121004, Haryana, India</p>
                  </li>
                  <li>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Phone</h4>
                    <a href="tel:+919711415164" className="text-white text-lg hover:text-[#49769F] block">+91 9711 415 164</a>
                    <a href="tel:+918053650222" className="text-white text-lg hover:text-[#49769F] block">+91 8053 650 222</a>
                  </li>
                  <li>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Email</h4>
                    <a href="mailto:info@taplindia.net" className="text-white text-lg hover:text-[#49769F] block">info@taplindia.net</a>
                    <a href="mailto:rahul@taplindia.net" className="text-white text-lg hover:text-[#49769F] block">rahul@taplindia.net</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
