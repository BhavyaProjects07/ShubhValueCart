import React from 'react';
import { MapPin, Mail, Phone, ShoppingBag, Package, Shirt } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">About Shubh Value Cart</h1>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your one-stop destination for quality products. We take pride in offering a diverse range of items to meet all your daily needs under one roof.
          </p>
        </div>

        {/* What We Sell Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 mb-10 text-center">What We Offer</h2>
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
          <div className="bg-black text-white rounded-2xl p-8">
            <h2 className="text-2xl font-serif mb-6">Contact Us</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+918955497322" className="text-lg hover:text-gray-300 transition-colors">
                    +91 89554 97322
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:shubhvaluecart@gmail.com" className="text-lg hover:text-gray-300 transition-colors">
                    shubhvaluecart@gmail.com
                  </a>
                  
                </div>
                
              </div>
            </div>
            
          </div>

          

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Visit Our Store</h2>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 mt-1 text-gray-900" />
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Address</p>
                <address className="not-italic text-lg text-gray-900 leading-relaxed">
                  0, M/S BAJRANG AGENCY,<br />
                  SHREERAM MANDIR KE PASS,<br />
                  GADARPURA ROAD,<br />
                  Dholpur
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start bg-white text-gray-500 shadow-[0px_1px_4px_0px] shadow-black/20 rounded-xl p-6 mt-20">
            <div className="bg-blue-600/20 p-3 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="28" width="28">
                    <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="m7.084 9.917-1.727 1.15c-1.238.826-1.856 1.239-2.192 1.868-.335.629-.333 1.368-.328 2.848.006 1.78.023 3.594.069 5.43.108 4.356.163 6.534 1.764 8.135 1.601 1.602 3.809 1.657 8.223 1.767 2.747.069 5.469.069 8.215 0 4.414-.11 6.622-.165 8.223-1.767s1.656-3.779 1.764-8.135c.046-1.836.063-3.65.069-5.43.005-1.48.007-2.219-.328-2.848-.336-.63-.954-1.042-2.192-1.867l-1.727-1.151"/>
                    <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="m2.833 14.167 9.794 5.876c2.13 1.278 3.196 1.917 4.373 1.917s2.243-.639 4.373-1.917l9.794-5.876"/>
                    <path strokeWidth="2.5" stroke="#115DFC" d="M7.083 17V8.5c0-2.671 0-4.007.83-4.837s2.166-.83 4.837-.83h8.5c2.671 0 4.007 0 4.837.83s.83 2.166.83 4.837V17"/>
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#115DFC" d="M14.167 14.167h5.666M14.167 8.5h5.666"/>
                </svg>
            </div>
            <h1 className="text-xl font-semibold mt-4 text-gray-800">Subscribe for updates</h1>
            <h1 className="text-sm mt-3">Stay Informed, We'd love to keep you updated with the latest news, exclusive offers, and valuable insights. Please give your consent to receive messages and emails from us.
</h1>
            <input type="email" placeholder="Enter your email id" className="text-sm border border-gray-500/30 max-w-80 w-full px-3 h-10 outline-none rounded mt-4" />
            <button type="button" className="bg-black hover:bg-indigo-600/90 transition text-white w-full h-10 mt-3 rounded text-sm">Submit</button>
        </div>
      </div>
      
    </div>
  );
}
