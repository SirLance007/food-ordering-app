import React from 'react';

const CoffeeLogo = () => {
    return (
        <div className="relative w-12 h-12 flex items-center justify-center group cursor-pointer">
            {/* Container for floating animation */}
            <div className="relative animate-float">

                {/* Steam Animation */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-1 h-3 bg-white/40 rounded-full animate-steam opacity-0" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-4 bg-white/40 rounded-full animate-steam opacity-0" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-1 h-3 bg-white/40 rounded-full animate-steam opacity-0" style={{ animationDelay: '0.8s' }}></div>
                </div>

                {/* Cup Body */}
                <div className="relative z-10">
                    {/* Main Cup Shape */}
                    <div className="w-8 h-6 bg-gradient-to-br from-[#C67C4E] to-[#8B5A3E] rounded-b-2xl rounded-t-sm shadow-lg relative">
                        {/* Coffee Liquid Top */}
                        <div className="absolute -top-1 left-0 w-8 h-2 bg-[#4A3228] rounded-[100%] border border-[#C67C4E]/50"></div>

                        {/* Rim Highlight */}
                        <div className="absolute -top-1 left-0 w-8 h-2 border-t border-white/20 rounded-[100%]"></div>
                    </div>

                    {/* Cup Handle */}
                    <div className="absolute top-1 -right-2 w-3 h-4 border-2 border-[#C67C4E] rounded-r-md -z-10"></div>

                    {/* Saucer */}
                    <div className="absolute -bottom-1 -left-1 w-10 h-1 bg-[#2A2A2A] rounded-full shadow-md z-0"></div>
                </div>

            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#C67C4E]/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-10px) scale(1.5); opacity: 0; }
        }
        .animate-steam {
            animation: steam 2s infinite;
        }
      `}</style>
        </div>
    );
};

export default CoffeeLogo;
