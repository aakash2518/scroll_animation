'use client';
import { useState } from 'react';
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function ContactForm() {
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
    <section id="contact" className="relative border-t border-white/5 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side — Solid Orange */}
        <div className="w-full lg:w-5/12 bg-[#0A4174] relative overflow-hidden py-16 px-8 md:px-16 flex flex-col justify-center">
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-white/50"></div>
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">LET'S BUILD TOGETHER</span>
            </div>
            
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] uppercase">
              READY TO START YOUR PROJECT?
            </h2>
            
            <p className="text-white/80 text-lg font-light leading-relaxed mb-12 max-w-md">
              Contact us today for a consultation and let's build something great.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white w-4 h-4" />
                </div>
                <div className="text-white font-light space-y-1">
                  <a href="tel:+919711415164" className="block hover:underline">+91 9711 415 164</a>
                  <a href="tel:+918053650222" className="block hover:underline">+91 8053 650 222</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white w-4 h-4" />
                </div>
                <div className="text-white font-light space-y-1">
                  <a href="mailto:info@taplindia.net" className="block hover:underline">info@taplindia.net</a>
                  <a href="mailto:rahul@taplindia.net" className="block hover:underline">rahul@taplindia.net</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white w-4 h-4" />
                </div>
                <address className="not-italic text-white font-light leading-relaxed">
                  Plot No. 353, Sector-68,<br/>
                  IMT Faridabad - 121004,<br/>
                  Haryana, India
                </address>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side — Dark Form */}
        <div className="w-full lg:w-7/12 bg-[#0a0a0a] py-16 px-8 md:px-16 flex items-center">
          <div className="w-full max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 bg-[#0A4174]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#0A4174]" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-4 text-white uppercase">MESSAGE SENT</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  Thank you for your interest. Our team will review your requirements and get back to you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="bg-transparent border border-white/20 hover:border-[#0A4174] hover:text-[#0A4174] text-white px-8 py-3 text-xs tracking-widest font-bold uppercase transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input required type="text" className="w-full bg-[#111111] border border-white/10 focus:border-[#0A4174] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm" placeholder="Full Name" />
                  </div>
                  <div>
                    <input required type="email" className="w-full bg-[#111111] border border-white/10 focus:border-[#0A4174] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm" placeholder="Email Address" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input type="tel" className="w-full bg-[#111111] border border-white/10 focus:border-[#0A4174] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm" placeholder="Phone Number" />
                  </div>
                  <div>
                    <input required type="text" className="w-full bg-[#111111] border border-white/10 focus:border-[#0A4174] p-4 text-white placeholder-gray-500 outline-none transition-colors text-sm" placeholder="Company Name" />
                  </div>
                </div>
                
                <div>
                  <textarea required rows={5} className="w-full bg-[#111111] border border-white/10 focus:border-[#0A4174] p-4 text-white placeholder-gray-500 outline-none transition-colors resize-none text-sm" placeholder="Tell us about your project"></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="group flex items-center justify-center gap-3 transition-all duration-300 bg-[#0A4174] hover:bg-[#3d44b0] text-white px-8 py-4 font-bold tracking-widest text-xs w-full uppercase"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
