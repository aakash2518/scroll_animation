'use client';
import { useState } from 'react';
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ContactUsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* Full-height Contact Section */}
      <section className="relative flex-1 flex flex-col lg:flex-row min-h-screen pt-20">

        {/* Left Side Background — Solid Blue */}
        <div className="absolute top-0 left-0 w-full lg:w-5/12 h-full z-0 bg-gradient-to-br from-[#003d5c] via-[#005f8a] to-[#0077B6]"></div>

        {/* Right Side Background — Image */}
        <div className="absolute top-0 right-0 w-full lg:w-7/12 h-full z-0 overflow-hidden">
          <Image
            src="/images/company-image-1-min-min-1.jpg"
            alt="Industrial Background"
            fill
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0a1a2e]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#005f8a] via-transparent to-transparent"></div>
        </div>

        {/* Left Side — Info */}
        <div className="w-full lg:w-5/12 relative z-10 py-16 px-8 md:px-16 flex flex-col justify-center">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-white/50"></div>
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">GET IN TOUCH</span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] uppercase">
              READY TO START YOUR PROJECT?
            </h1>

            <p className="text-white/80 text-lg font-light leading-relaxed mb-12 max-w-md">
              Contact us today for a consultation and let&apos;s build something great. For business inquiry, our team will help you within 24 hours.
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-300 group">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                  <Phone className="text-white w-4 h-4" />
                </div>
                <div className="text-white font-light text-sm space-y-1">
                  <a href="tel:+919711415164" className="block hover:underline">(+91) 9711 415 164</a>
                  <a href="tel:+918053650222" className="block hover:underline">(+91) 8053 650 222</a>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-300 group">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                  <Mail className="text-white w-4 h-4" />
                </div>
                <div className="text-white font-light text-sm space-y-1">
                  <a href="mailto:info@taplindia.net" className="block hover:underline">info@taplindia.net</a>
                  <a href="mailto:rahul@taplindia.net" className="block hover:underline">rahul@taplindia.net</a>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-300 group">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                  <MapPin className="text-white w-4 h-4" />
                </div>
                <address className="not-italic text-white font-light text-sm leading-relaxed">
                  Plot No. 353, Sector-68,<br/>
                  IMT Faridabad - 121004,<br/>
                  Haryana, India
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="w-full lg:w-7/12 relative z-10 py-16 px-8 md:px-16 flex items-center">
          <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/50">

            {/* Logo / Brand Header */}
            <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-white/10">
              <Image
                src="/OMlogo.png"
                alt="TAPL India Logo"
                width={50}
                height={50}
                unoptimized
                className="object-contain"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-white tracking-wider">TAPL</h3>
                <p className="text-[#00B4D8] text-[10px] font-bold tracking-[0.2em] uppercase">INDIA</p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-20 h-20 bg-[#0077B6]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#0077B6]" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-4 text-white uppercase">MESSAGE SENT</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  Thank you for your interest. Our team will review your requirements and get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-transparent border border-white/20 hover:border-[#0077B6] hover:text-[#0077B6] text-white px-8 py-3 text-xs tracking-widest font-bold uppercase transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input required type="text" className="w-full bg-white/5 border border-white/15 focus:border-[#0077B6] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm rounded-lg" placeholder="Full Name" />
                  </div>
                  <div>
                    <input required type="email" className="w-full bg-white/5 border border-white/15 focus:border-[#0077B6] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm rounded-lg" placeholder="Email Address" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input type="tel" className="w-full bg-white/5 border border-white/15 focus:border-[#0077B6] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm rounded-lg" placeholder="Phone Number" />
                  </div>
                  <div>
                    <input required type="text" className="w-full bg-white/5 border border-white/15 focus:border-[#0077B6] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm rounded-lg" placeholder="Company Name" />
                  </div>
                </div>

                <div>
                  <textarea required rows={5} className="w-full bg-white/5 border border-white/15 focus:border-[#0077B6] p-4 text-white placeholder-gray-500 outline-none transition-colors resize-none text-sm rounded-lg" placeholder="Tell us about your project"></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-3 transition-all duration-300 bg-[#0077B6] hover:bg-[#005f8a] text-white px-8 py-4 font-bold tracking-widest text-xs w-full uppercase rounded-lg"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 py-4 text-center border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase">
            Industrial Automation &amp; Material-Handling Solutions
          </p>
        </div>
      </section>
    </main>
  );
}
