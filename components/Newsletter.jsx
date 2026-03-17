'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Newsletter = () => {
    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden font-inter">
            <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            .font-inter { font-family: 'Inter', sans-serif; }
            `}} />
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
            >
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 relative">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="https://picsum.photos/seed/modernlifestyle/1000/1200" 
                    alt="Modern Lifestyle"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-8 -right-8 md:-right-12 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100 hidden sm:flex flex-col justify-center"
                >
                <p className="text-3xl font-extrabold tracking-tighter text-[#1D1D1F] mb-1">Timeless.</p>
                <p className="text-xs tracking-[0.2em] font-bold uppercase text-gray-500">Curated Excellence</p>
                </motion.div>
            </motion.div>
            
            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col justify-center"
            >
                <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                Join The Club
                </h3>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#1D1D1F] mb-8 leading-[1.05]">
                Excellence <br/>In Every <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400">Detail.</span>
                </h2>
                <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg">
                Subscribe for exclusive access to new collections, early product drops, and curated lifestyle inspiration.
                </p>
                
                <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full bg-gray-100 border border-transparent text-[#1D1D1F] placeholder-gray-500 px-6 py-4 rounded-full outline-none focus:border-gray-300 focus:bg-white transition-all duration-300 shadow-inner"
                    required
                />
                <button className="w-full sm:w-auto px-8 py-4 bg-[#1D1D1F] text-white font-semibold rounded-full hover:bg-black hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shrink-0 shadow-md">
                    Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                </form>
            </motion.div>
            </div>
        </section>
    )
}

export default Newsletter