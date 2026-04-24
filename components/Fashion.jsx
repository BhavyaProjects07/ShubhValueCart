import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
export default function FashionProducts() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
        <div>
          <span className="text-[#2874f0] text-xs font-bold uppercase tracking-widest mb-1 block">Discover More</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Exclusive Offers & Trends
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Large Banner */}
        <a href="/shop" className="lg:col-span-2 xl:col-span-2 group relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block border border-gray-100">
          <Image
  src="https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20clothes%20_20251223_223953_0000.png?tr=w-1200,q-50"
  alt="Fashion Collection"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
  quality={50}
  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center max-w-xl">
            <span className="text-[#ff9900] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 border border-[#ff9900]/30 w-fit px-3 py-1.5 rounded bg-black/40 backdrop-blur-sm">
              Arriving soon
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-md">
              Best Quality Clothes
            </h3>
            <p className="text-gray-200 text-sm sm:text-base font-medium mb-8 line-clamp-2 max-w-md drop-shadow">
              Explore the latest collections from top brands at unbeatable prices. Fast delivery and easy returns on all fashion items.
            </p>
            <div className="bg-white text-gray-900 font-bold px-6 py-3.5 rounded-xl w-fit hover:bg-[#2874f0] hover:text-white transition-colors duration-300 flex items-center gap-2 shadow-lg">
              Shop Collection <ArrowRight size={18} />
            </div>
          </div>
        </a>

        {/* Small Banners Column */}
        <div className="flex flex-col gap-4 sm:gap-6 h-full">
          <a href="/shop" className="group relative flex-1 min-h-[220px] sm:min-h-[250px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block border border-gray-100">
                      <img 
                          loading='lazy'
              src="https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww" 
              alt="Women Ethnic"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
             <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest mb-2 block border-l-2 border-[#ff9900] pl-2">Top Rated</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Women's Ethnic</h3>
                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ff9900] group-hover:text-white transition-colors">
                  Coming Soon... <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </a>

          <a href="/shop" className="group relative flex-1 min-h-[220px] sm:min-h-[250px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block border border-gray-100">
                      <img 
                          loading='lazy'
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" 
              alt="Footwear"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
             <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <span className="text-[#2874f0] text-[10px] font-bold uppercase tracking-widest mb-2 block border-l-2 border-[#2874f0] pl-2">Clearance</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Premium Footwear</h3>
                <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ff9900] group-hover:text-white transition-colors">
                  Coming Soon... <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </a>
        </div>

      </div>
    </section>
  );
}

