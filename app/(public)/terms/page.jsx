'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, FileText, Shield, CreditCard, Truck, RefreshCcw, AlertCircle, Scale, Lock, Mail, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'introduction', title: '1. Introduction', icon: <FileText size={18} /> },
  { id: 'user-accounts', title: '2. User Accounts', icon: <Shield size={18} /> },
  { id: 'orders-payments', title: '3. Orders & Payments', icon: <CreditCard size={18} /> },
  { id: 'pricing-discounts', title: '4. Pricing & Discounts', icon: <TagIcon size={18} /> },
  { id: 'shipping-delivery', title: '5. Shipping & Delivery', icon: <Truck size={18} /> },
  { id: 'returns-refunds', title: '6. Returns & Refunds', icon: <RefreshCcw size={18} /> },
  { id: 'cancellation', title: '7. Cancellation', icon: <AlertCircle size={18} /> },
  { id: 'user-responsibilities', title: '8. User Responsibilities', icon: <Shield size={18} /> },
  { id: 'prohibited-activities', title: '9. Prohibited Activities', icon: <AlertCircle size={18} /> },
  { id: 'intellectual-property', title: '10. Intellectual Property', icon: <Scale size={18} /> },
  { id: 'limitation-liability', title: '11. Limitation of Liability', icon: <Scale size={18} /> },
  { id: 'privacy', title: '12. Privacy', icon: <Lock size={18} /> },
  { id: 'contact', title: '13. Contact', icon: <Mail size={18} /> },
];

// Helper icon component since Tag isn't imported by default in the list above
function TagIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
      <path d="M7 7h.01"/>
    </svg>
  );
}

const Terms = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Determine active section
      const sectionElements = sections.map(section => document.getElementById(section.id));
      let currentActive = sections[0].id;
      
      for (const section of sectionElements) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section top is near the top of the viewport (with some offset for the header)
          if (rect.top <= 150) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for fixed header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800 pt-[100px] md:pt-[120px] pb-16 relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-[70px] md:top-[80px] left-0 w-full h-1 bg-gray-200 z-40">
        <div 
          className="h-full bg-[#2874f0] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm md:text-base font-medium">Last Updated: April 11, 2026</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Mobile Dropdown Menu */}
          <div className="md:hidden w-full sticky top-[80px] z-30 bg-[#f8f9fa] py-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg flex items-center justify-between shadow-sm font-semibold text-gray-700"
            >
              <span className="flex items-center gap-2">
                {sections.find(s => s.id === activeSection)?.icon}
                {sections.find(s => s.id === activeSection)?.title}
              </span>
              <ChevronDown className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-xl max-h-[60vh] overflow-y-auto z-50">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors ${
                      activeSection === section.id ? 'bg-blue-50 text-[#2874f0] font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className={activeSection === section.id ? 'text-[#2874f0]' : 'text-gray-400'}>{section.icon}</span>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 lg:w-80 shrink-0 sticky top-[120px] self-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between group transition-all duration-200 ${
                      activeSection === section.id 
                        ? 'bg-blue-50 text-[#2874f0] font-bold shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeSection === section.id ? 'text-[#2874f0]' : 'text-gray-400 group-hover:text-gray-600 transition-colors'}>
                        {section.icon}
                      </span>
                      <span className="text-sm">{section.title}</span>
                    </div>
                    {activeSection === section.id && <ChevronRight size={16} className="text-[#2874f0]" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 lg:p-12">
            
            <section id="introduction" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">1. Introduction</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>Welcome to Shubh Value Cart (https://shubhavaluecart.in). These Terms and Conditions govern your use of our website, mobile application, and related services (collectively, the "Platform").</p>
                <p>By accessing, browsing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our Platform.</p>
                <p>Shubh Value Cart is an e-commerce marketplace designed to provide customers with high-quality products at competitive prices across various categories including electronics, fashion, home essentials, and more.</p>
              </div>
            </section>

            <section id="user-accounts" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">2. User Accounts</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>To access certain features of the Platform, you may be required to register for an account. By creating an account, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during the registration process.</li>
                  <li>Maintain and promptly update your account information to keep it accurate and complete.</li>
                  <li>Maintain the security and confidentiality of your login credentials.</li>
                  <li>Accept responsibility for all activities that occur under your account.</li>
                </ul>
                <p>You must be at least 18 years of age to create an account and make purchases. We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, false, or violates these Terms.</p>
              </div>
            </section>

            <section id="orders-payments" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. Orders & Payments</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p><strong>Payment Methods:</strong> We support multiple payment methods including Credit/Debit Cards, Net Banking, UPI, and Wallets processed securely via Razorpay. We also offer Cash on Delivery (COD) for eligible pin codes and order values.</p>
                <p><strong>Order Confirmation:</strong> Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.</p>
                <p><strong>Fraud Prevention:</strong> To protect against fraud, we may require additional verifications or information before accepting any order. We reserve the right to cancel COD orders if the phone number provided is unreachable or if the account exhibits suspicious buying patterns.</p>
              </div>
            </section>

            <section id="pricing-discounts" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">4. Pricing & Discounts</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p><strong>Pricing:</strong> All prices listed on the Platform are subject to change without notice. In the event a product is listed at an incorrect price due to a typographical error or error in pricing information, we shall have the right to refuse or cancel any orders placed for the product listed at the incorrect price.</p>
                <p><strong>Coupons & Promotions:</strong> Discount codes, coupons, and promotional offers are subject to specific terms and conditions. They:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cannot be combined with other offers unless explicitly stated.</li>
                  <li>May have minimum order value conditions.</li>
                  <li>Are valid for a limited time and can be withdrawn at our discretion.</li>
                  <li>Are non-transferable and cannot be exchanged for cash.</li>
                </ul>
              </div>
            </section>

            <section id="shipping-delivery" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. Shipping & Delivery</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p><strong>Timelines:</strong> Estimated delivery timelines are provided at checkout based on your pin code. While we strive to deliver within these timelines, they are estimates and not guarantees.</p>
                <p><strong>Delays:</strong> Shubh Value Cart is not liable for any delays in delivery caused by courier partners, natural disasters, strikes, national holidays, or any other unforeseen circumstances beyond our control.</p>
                <p><strong>Delivery Attempts:</strong> Our courier partners will make reasonable attempts to deliver your package. If delivery fails due to customer unavailability or incorrect address, the package will be returned to our warehouse, and a refund (excluding shipping charges) will be initiated for prepaid orders.</p>
              </div>
            </section>

            <section id="returns-refunds" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">6. Returns & Refunds</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>We operate under a strict Quality Assurance and Proof Directive policy. Please refer to our <a href="/privacy-policy" className="text-[#2874f0] hover:underline font-medium">Return & Quality Assurance Policy</a> for complete details.</p>
                <p><strong>Conditions:</strong> Returns are only accepted for damaged, defective, or incorrect items reported within 48 hours of delivery. A continuous, uncut unboxing video is mandatory for all return claims.</p>
                <p><strong>Refund Timelines:</strong> Approved refunds will be processed to the original payment method within 5-7 business days after the returned item is received and verified at our warehouse. For COD orders, refunds will be issued to a bank account provided by the customer.</p>
              </div>
            </section>

            <section id="cancellation" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">7. Cancellation</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p><strong>When Allowed:</strong> You may cancel your order free of charge at any time before the order is marked as "Shipped" in our system.</p>
                <p><strong>When Not Allowed:</strong> Once an order has been dispatched and marked as "Shipped", it cannot be cancelled under any circumstances. You must receive the package and initiate a return request if eligible.</p>
                <p>We reserve the right to cancel any order at our sole discretion, including but not limited to cases of suspected fraud, pricing errors, or inventory unavailability.</p>
              </div>
            </section>

            <section id="user-responsibilities" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">8. User Responsibilities</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>As a user of Shubh Value Cart, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete shipping addresses and contact information.</li>
                  <li>Use the Platform in good faith and for lawful purposes only.</li>
                  <li>Not engage in any activity that disrupts or interferes with the Platform's functionality.</li>
                  <li>Read and understand product descriptions, specifications, and terms before making a purchase.</li>
                </ul>
              </div>
            </section>

            <section id="prohibited-activities" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">9. Prohibited Activities</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>You are strictly prohibited from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Fraud:</strong> Using stolen payment methods, creating fake accounts, or exploiting promotional codes.</li>
                  <li><strong>Misuse:</strong> Filing false return claims, returning used/altered products, or abusing the COD facility.</li>
                  <li><strong>Unauthorized Access:</strong> Attempting to hack, scrape, or reverse-engineer the Platform, or accessing data not intended for you.</li>
                  <li><strong>Content Scraping:</strong> Using automated bots to extract pricing, product data, or images from our Platform.</li>
                </ul>
                <p>Violation of these rules will result in immediate account termination and potential legal action.</p>
              </div>
            </section>

            <section id="intellectual-property" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">10. Intellectual Property</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>All content included on the Platform, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Shubh Value Cart or its content suppliers and protected by Indian and international copyright laws.</p>
                <p>You may not systematically extract or re-utilize parts of the contents of the Platform without our express written consent.</p>
              </div>
            </section>

            <section id="limitation-liability" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">11. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>The Platform and all information, content, materials, products, and services included on or otherwise made available to you are provided on an "as is" and "as available" basis.</p>
                <p>To the full extent permissible by applicable law, Shubh Value Cart disclaims all warranties, express or implied. We shall not be liable for any indirect, incidental, punitive, or consequential damages arising from your use of the Platform, including but not limited to lost profits, lost data, or business interruption.</p>
              </div>
            </section>

            <section id="privacy" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">12. Privacy</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-[#2874f0] hover:underline font-medium">Privacy Policy</a>, which also governs your visit to Shubh Value Cart, to understand our practices regarding the collection, use, and disclosure of your personal information.</p>
              </div>
            </section>

            <section id="contact" className="mb-4 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">13. Contact</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>Stay Informed, We'd love to keep you updated with the latest news, exclusive offers, and valuable insights. Please give your consent to receive messages & RCS messages and emails from us.</p>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg mt-4 inline-block w-full sm:w-auto">
                  <p className="font-bold text-gray-900 mb-1">Shubh Value Cart Legal Team</p>
                  <p className="flex items-center gap-2 text-[#2874f0] font-medium">
                    <Mail size={16} />
                    <a href="mailto:support@shubhavaluecart.in" className="hover:underline">shubhavaluecart@gmail.com</a>
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Terms;
