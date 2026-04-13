'use client'
import React from 'react';
import { MapPin, Mail, Phone, ShoppingBag, Package, Shirt, Award, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 pt-[100px] md:pt-[140px]">
      <div className="max-w-6xl mx-auto">
        
        {/* Founder Biography Section - Eye Catching */}
        <div className="mb-24">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image Side */}
              <div className="lg:col-span-5 relative h-[400px] lg:h-auto bg-gray-900">
                {/* Note: Replace this placeholder with the actual image of Shubham Goyal */}
                <img 
                  src="https://ik.imagekit.io/rsjsqdge7/IMG_8116.JPEG?q=80&w=1000&auto=format&fit=crop" 
                  alt="Shubham Goyal - Founder" 
                  className="w-full h-full object-cover object-top opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white"
                  >
                    <h3 className="text-2xl font-bold mb-1">Shubham Goyal</h3>
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Founder & Visionary Leader</p>
                  </motion.div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2874f0] text-xs font-bold uppercase tracking-widest mb-6">
                    <Award size={14} /> The Journey
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">
                    From Struggle to Success, From Responsibility to Leadership.
                  </h2>
                  
                  <div className="space-y-5 text-gray-600 leading-relaxed text-sm md:text-base">
                    <p>
                      <strong className="text-gray-900">Shubham Goyal</strong> is a dynamic entrepreneur whose journey reflects resilience, vision, and unwavering determination. At a very young age, life tested him with immense responsibilities. After the untimely loss of his father, Shubham stepped forward to manage his family and transform adversity into opportunity.
                    </p>
                    <p>
                      With consistent hard work, integrity, and a sharp business mindset, he has emerged as the largest and most trusted trader of Gatter and TMT steel bars in the Dholpur district. His strong presence in the cement industry, especially as one of the biggest partners of Wonder Cement in Dholpur, has further strengthened his reputation as a dependable industry leader.
                    </p>
                    <p>
                      Driven by a clear long-term vision, Shubham believes not just in building businesses, but in creating institutions that generate employment, trust, and lasting value. Expanding beyond construction materials, he has successfully launched <strong>Shubh Value Cart 🛒</strong>, the largest open-format retail store in Dholpur, spread across an impressive 4000 sq. ft. area. The store stands as a symbol of modern retail, customer-centric service, and affordable quality for the people of the region.
                    </p>
                    <p>
                      Recently, he celebrated his sister's wedding with grand celebrations and pride, marking another milestone in his inspiring journey. Today, Shubham Goyal's business ventures collectively hold a valuation exceeding INR 20 Crores, supported by a dedicated team of 25+ employees working across his enterprises.
                    </p>
                    <p className="font-medium text-gray-800 italic border-l-4 border-[#ff9900] pl-4 py-1">
                      "Shubham Goyal is more than a successful businessman — he is a visionary leader and a source of inspiration for young entrepreneurs, proving that with courage, clarity of vision, and relentless effort, even the most challenging beginnings can lead to remarkable success."
                    </p>
                  </div>

                  {/* Stats/Highlights */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 text-[#2874f0] mb-2">
                        <TrendingUp size={20} />
                        <span className="font-bold text-xl">₹20Cr+</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Business Valuation</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#2874f0] mb-2">
                        <ShoppingBag size={20} />
                        <span className="font-bold text-xl">4000 sq.ft</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Retail Space</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 text-[#2874f0] mb-2">
                        <Users size={20} />
                        <span className="font-bold text-xl">25+</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Dedicated Team</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">About Shubh Value Cart</h1>
          <div className="w-24 h-1 bg-[#2874f0] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your one-stop destination for quality products. We take pride in offering a diverse range of items to meet all your daily needs under one roof.
          </p>
        </div>

        {/* What We Sell Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Groceries */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
                  alt="Indian Groceries" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-5 h-5 text-gray-900" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Indian Groceries</h3>
                <p className="text-gray-600 text-sm">Authentic spices, staples, and daily grocery needs for your kitchen.</p>
              </div>
            </div>
            
            {/* Toys */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop" 
                  alt="Toys" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <Package className="w-5 h-5 text-gray-900" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Toys</h3>
                <p className="text-gray-600 text-sm">A wide selection of fun, educational, and engaging toys for children of all ages.</p>
              </div>
            </div>

            {/* Clothes */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop" 
                  alt="Clothes" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <Shirt className="w-5 h-5 text-gray-900" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Clothes</h3>
                <p className="text-gray-600 text-sm">Comfortable and stylish clothing options for the whole family.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Location Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-serif mb-8">Contact Us</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Phone</p>
                  <a href="tel:+918955497322" className="text-lg font-medium hover:text-[#ff9900] transition-colors block">
                    +91 89554 97322
                  </a>
                  <a href="tel:+918445695011" className="text-lg font-medium hover:text-[#ff9900] transition-colors block">
                    +91 84456 95011
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Email</p>
                  <a href="mailto:shubhvaluecart@gmail.com" className="text-lg font-medium hover:text-[#ff9900] transition-colors">
                    shubhvaluecart@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-serif text-gray-900 mb-8">Visit Our Store</h2>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#2874f0]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Address</p>
                <address className="not-italic text-base text-gray-700 leading-relaxed font-medium">
                  0, M/S BAJRANG AGENCY,<br />
                  SHREERAM MANDIR KE PASS,<br />
                  GADARPURA ROAD,<br />
                  Dholpur, Rajasthan 328001
                </address>
                <a 
                  href="https://maps.app.goo.gl/ncwArcCqCxLmbBux8" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block mt-4 text-sm font-bold text-[#2874f0] hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
