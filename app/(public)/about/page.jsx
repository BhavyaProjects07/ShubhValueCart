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
      </div>
    </div>
  );
}
