export default function CareerPage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* Static Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center border-b border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
        
        <div className="relative z-10 text-center container mx-auto px-6 mt-16">
          <h4 className="text-[#ff4500] font-bold tracking-widest text-sm mb-4 uppercase">Join Our Team</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase drop-shadow-2xl">
            Career
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505] flex-grow">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Build the Future of Industrial Automation</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-16">
            We are always looking for passionate engineers, designers, and innovators to join our team. 
            If you are driven by precision and excellence, we want to hear from you.
          </p>
          
          <div className="p-12 border border-white/5 bg-[#0a0a0a]">
            <h3 className="text-2xl font-bold mb-4 text-[#ff4500]">Current Openings</h3>
            <p className="text-gray-500 mb-8">
              There are currently no open positions. Please check back later or send your resume to our HR department.
            </p>
            <a href="mailto:info@taplindia.net" className="inline-block border border-white/20 hover:border-[#ff4500] text-white px-8 py-4 font-bold tracking-widest text-sm transition-colors">
              SUBMIT RESUME
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
