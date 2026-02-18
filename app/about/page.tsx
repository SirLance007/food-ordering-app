export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32">

            {/* Editorial Header */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-[#2A2A2A]">
                            <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" alt="Coffee Shop Interior" className="object-cover w-full h-full" />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80"></div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <span className="text-[#C67C4E] font-bold tracking-widest uppercase text-xs mb-4 block">Our Heritage</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Crafting Coffee <br /> <span className="text-[#9B9B9B]">For You</span>
                        </h1>
                        <div className="text-[#9B9B9B] leading-relaxed space-y-6">
                            <p>
                                We believe that a cup of coffee is more than just a drink—it’s an experience. From the careful selection of beans to the precise roasting process, every step is a labor of love.
                            </p>
                            <p>
                                Our shop started as a small passion project and has grown into a community hub where coffee lovers gather to enjoy the finest blends in a modern, cozy atmosphere.
                            </p>
                        </div>

                        <div className="mt-8 flex gap-8">
                            <div>
                                <span className="text-2xl font-bold text-white block">25k+</span>
                                <span className="text-xs text-[#9B9B9B]">Happy Customers</span>
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-white block">150+</span>
                                <span className="text-xs text-[#9B9B9B]">Unique Blends</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-[#1C1C1C] py-20 px-6 mt-12 rounded-t-[40px]">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">The Baristas</h2>
                    <p className="text-[#9B9B9B] max-w-lg mx-auto">Meet the experts behind the machine.</p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Sarah Jenkins", role: "Head Roaster", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop" },
                        { name: "David Chen", role: "Lead Barista", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
                        { name: "Maria Rodriguez", role: "Pastry Chef", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" }
                    ].map((member, i) => (
                        <div key={i} className="bg-[#252525] p-6 rounded-3xl text-center group hover:-translate-y-2 transition-transform">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#C67C4E]">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <h3 className="text-lg font-bold text-white">{member.name}</h3>
                            <p className="text-[#C67C4E] text-xs uppercase tracking-wide mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
