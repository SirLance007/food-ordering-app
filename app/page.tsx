import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] overflow-x-hidden selection:bg-[#C67C4E] selection:text-white">

      {/* Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer with Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center animate-scale-in"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop')" }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto animate-reveal">
          <span className="text-[#C67C4E] tracking-[0.4em] text-xs md:text-sm font-bold uppercase mb-6 block drop-shadow-lg">
            Est. 2024
          </span>
          <h1 className="text-6xl md:text-9xl font-serif italic text-white mb-8 leading-[0.9] lux-text-shadow blend-mode-overlay">
            The Art <br /> <span className="not-italic font-light">of Coffee</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-lg mx-auto mb-12 font-light leading-relaxed opacity-90">
            Experience the ritual. Meticulously sourced, perfectly roasted, and brewed with passion in every cup.
          </p>
          <Link
            href="/menu"
            className="inline-block px-10 py-4 border border-white/30 text-white font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500 backdrop-blur-sm"
          >
            Explore Menu
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* Editorial Section 1: The Origin */}
      <section className="py-32 px-6 md:px-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 relative group">
            <div className="aspect-[3/4] overflow-hidden relative z-10">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574&auto=format&fit=crop"
                alt="Interior"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-[#C67C4E]/50 hidden md:block"></div>
          </div>
          <div className="order-1 md:order-2 px-8">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-white">
              Minimalist <br /> <span className="text-[#C67C4E] italic">Sanctuary</span>
            </h2>
            <p className="text-gray-400 leading-loose font-light mb-8">
              Designed as a refuge from the noise. Our space combines raw brutalist elements with warm textures, creating an atmosphere that invites you to slow down, reflect, and savor the moment.
            </p>
            <Link href="/about" className="text-white border-b border-[#C67C4E] pb-1 hover:text-[#C67C4E] transition-colors">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee / Signature Drinks */}
      <section className="py-24 bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-[#C67C4E] tracking-[0.2em] text-xs uppercase block mb-4">Curated Selection</span>
          <h3 className="text-4xl font-serif text-white">Signature Blends</h3>
        </div>

        <div className="flex gap-8 px-6 overflow-x-auto no-scrollbar pb-10">
          {[
            { name: "Caffe Mocha", price: "4.50", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop" },
            { name: "Flat White", price: "3.50", img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop" },
            { name: "Cold Brew", price: "5.00", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop" },
            { name: "Matcha", price: "5.50", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=800&auto=format&fit=crop" }
          ].map((item, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[350px] group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                <h4 className="text-2xl font-serif text-white">{item.name}</h4>
                <span className="text-[#C67C4E] font-mono">${item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Section 2: The Craft */}
      <section className="py-32 px-6 md:px-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="px-8">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-white">
              Roasting <br /> <span className="text-[#C67C4E] italic">Perfection</span>
            </h2>
            <p className="text-gray-400 leading-loose font-light mb-8">
              We source our beans from small-lot farms in Ethiopia and Colombia. Meticulously roasted in small batches to highlight the unique terroir of every origin.
            </p>
            <Link href="/menu" className="text-white border-b border-[#C67C4E] pb-1 hover:text-[#C67C4E] transition-colors">
              View Menu
            </Link>
          </div>
          <div className="relative group">
            <div className="aspect-square overflow-hidden relative z-10">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop"
                alt="Roasting"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-[#C67C4E]/50 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="py-40 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="relative z-10">
          <h2 className="text-6xl md:text-9xl font-serif text-white mb-10 opacity-90">BrewHaven</h2>
          <p className="text-xl text-gray-400 mb-10 tracking-widest uppercase text-xs">Seattle, WA • Since 2024</p>
          <div className="flex justify-center gap-8 text-sm font-bold text-white uppercase tracking-widest">
            <Link href="/menu" className="hover:text-[#C67C4E] transition-colors">Menu</Link>
            <Link href="/about" className="hover:text-[#C67C4E] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#C67C4E] transition-colors">Contact</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
