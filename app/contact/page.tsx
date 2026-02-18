export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32 px-6">
            <div className="max-w-6xl mx-auto py-12">

                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
                    <p className="text-[#9B9B9B]">We are always ready to serve you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Info Card */}
                    <div className="bg-[#252525] p-8 rounded-3xl flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-xl font-bold mb-8">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#131313] flex items-center justify-center text-[#C67C4E]">📍</div>
                                    <div>
                                        <p className="text-xs text-[#9B9B9B]">Address</p>
                                        <p className="text-sm font-medium">123 Coffee Lane, Seattle</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#131313] flex items-center justify-center text-[#C67C4E]">📞</div>
                                    <div>
                                        <p className="text-xs text-[#9B9B9B]">Phone Number</p>
                                        <p className="text-sm font-medium">8005665228</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#131313] flex items-center justify-center text-[#C67C4E]">✉️</div>
                                    <div>
                                        <p className="text-xs text-[#9B9B9B]">Email</p>
                                        <p className="text-sm font-medium">prankursharma40@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#313131]">
                            <p className="text-xs text-[#9B9B9B] mb-2">Opening Hours</p>
                            <div className="flex justify-between text-sm">
                                <span>Monday - Friday</span>
                                <span className="font-bold">8:00 AM - 9:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-[#1C1C1C] p-8 rounded-3xl border border-[#2A2A2A]">
                        <h2 className="text-xl font-bold mb-6">Send Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-xs text-[#9B9B9B] mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full h-12 rounded-xl bg-[#252525] border-none text-white text-sm px-4 focus:ring-1 focus:ring-[#C67C4E] outline-none"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[#9B9B9B] mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full h-12 rounded-xl bg-[#252525] border-none text-white text-sm px-4 focus:ring-1 focus:ring-[#C67C4E] outline-none"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[#9B9B9B] mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-xl bg-[#252525] border-none text-white text-sm p-4 focus:ring-1 focus:ring-[#C67C4E] outline-none"
                                    placeholder="Type your message..."
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="w-full py-4 bg-[#C67C4E] hover:bg-[#A66238] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#C67C4E]/20 mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
