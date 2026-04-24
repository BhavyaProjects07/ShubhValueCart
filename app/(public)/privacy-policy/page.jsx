'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Video, 
  Camera, 
  Clock, 
  Package, 
  XCircle, 
  Info, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  RefreshCcw,
  Lock,
  Mail,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-[#111111]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className={`bg-white p-8 sm:p-12 rounded-sm shadow-sm mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <ShieldCheck className="text-[#2874f0]" size={28} />
            <span className="text-sm font-semibold tracking-wider text-[#2874f0] uppercase">Shubh Value Cart Trust & Safety</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Return & Quality Assurance Policy
          </h1>
          
          <div className="flex flex-wrap gap-6 text-xs font-medium text-gray-500 border-t border-gray-100 pt-6">
            <span className="flex items-center gap-2"><FileText size={14} className="text-gray-400"/> Policy Ref: SVC-RET-48H</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-gray-400"/> Last Updated: {currentDate}</span>
            <span className="flex items-center gap-2"><Lock size={14} className="text-gray-400"/> Secure Shopping Guarantee</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white p-8 rounded-sm shadow-sm mb-6 border-l-4 border-[#ff9900]">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <strong>Shubh Value Cart</strong>, we value transparency, quality, and fairness. To ensure a smooth shopping experience and prevent misuse, we follow a strict order processing, cancellation, and return verification policy.
          </p>
        </div>

        {/* Order Status Section */}
        <div className="bg-white p-8 sm:p-12 rounded-sm shadow-sm mb-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order Status & Cancellation</h2>
              <p className="text-sm text-gray-500 mt-1">Understanding your order journey</p>
            </div>
            <Package className="text-gray-300 hidden sm:block" size={40} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: "1", status: "Order Placed", detail: "Order confirmed via email/SMS.", cancel: "Allowed", icon: <FileText size={20}/> },
              { id: "2", status: "Shipped", detail: "Dispatched from warehouse.", cancel: "Locked", icon: <RefreshCcw size={20}/> },
              { id: "3", status: "Out for Delivery", detail: "With courier for final delivery.", cancel: "Locked", icon: <ArrowRight size={20}/> },
              { id: "4", status: "Delivered", detail: "Received. 48-hour window starts.", cancel: "Complete", icon: <CheckCircle2 size={20}/> },
            ].map((stage, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded border border-gray-100 hover:border-[#2874f0] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#2874f0]/10 text-[#2874f0] flex items-center justify-center text-xs font-bold">{stage.id}</span>
                  <div className="text-gray-400">{stage.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{stage.status}</h3>
                <p className="text-xs text-gray-600 mb-4 h-10">{stage.detail}</p>
                <div className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded inline-block ${stage.cancel === 'Allowed' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  Cancel: {stage.cancel}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-700 font-medium">
              Notice: Once an order is marked as "Shipped", it cannot be cancelled under any circumstances.
            </p>
          </div>
        </div>

        {/* Verification Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-8 sm:p-10 rounded-sm shadow-sm relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff9900]/10 flex items-center justify-center">
                        <Clock className="text-[#ff9900]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">The 48-Hour Window</h3>
                </div>
                <ul className="space-y-4 text-sm text-gray-700">
                    <li className="flex gap-3 items-start"><Info size={18} className="text-[#2874f0] shrink-0 mt-0.5"/> <span>Inspect your order within 48 hours of delivery.</span></li>
                    <li className="flex gap-3 items-start"><Info size={18} className="text-[#2874f0] shrink-0 mt-0.5"/> <span>Any issues must be reported within this time frame.</span></li>
                    <li className="flex gap-3 items-start text-red-600 font-medium"><AlertTriangle size={18} className="shrink-0 mt-0.5"/> <span>Requests after 48 hours are automatically rejected.</span></li>
                </ul>
             </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-sm shadow-sm relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#2874f0]/10 flex items-center justify-center">
                        <Camera className="text-[#2874f0]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mandatory Proof</h3>
                </div>
                <ul className="space-y-4 text-sm text-gray-700">
                    <li className="flex gap-3 items-start font-medium"><Video size={18} className="text-[#ff9900] shrink-0 mt-0.5"/> <span>Continuous & uncut unboxing video.</span></li>
                    <li className="flex gap-3 items-start font-medium"><Camera size={18} className="text-[#ff9900] shrink-0 mt-0.5"/> <span>Clear photography of product, packaging, and defect.</span></li>
                    <li className="flex gap-3 items-start text-red-600 font-medium"><AlertTriangle size={18} className="shrink-0 mt-0.5"/> <span>Requests without BOTH will be rejected.</span></li>
                </ul>
             </div>
          </div>
        </div>

        {/* Eligibility Matrix */}
        <div className="bg-white p-8 sm:p-12 rounded-sm shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <ShieldCheck className="text-green-500" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Eligible Claims</h3>
              </div>
              <ul className="space-y-4">
                {['Product received is damaged', 'Product is defective', 'Wrong item delivered','Size, color, or style preference (if applicable)'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <XCircle className="text-red-500" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Restricted Claims</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Change of mind',
                  'Minor variations (lighting/display)',
                  'Used, washed, or altered products',
                  'Missing original tags or packaging',
                  'Claims raised after 48 hours'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video Directives */}
        <div className="bg-[#2874f0] text-white p-8 sm:p-12 rounded-sm shadow-sm mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Video size={240} className="-mt-10 -mr-10" />
          </div>
          <div className="relative z-10">
            <div className="mb-8">
               <h3 className="text-3xl font-bold mb-2">Unboxing Video Directives</h3>
               <p className="text-[#ff9900] font-semibold text-sm uppercase tracking-wider">Strict Compliance Required</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
               <ul className="space-y-4 text-sm font-medium">
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">1</div> Start recording BEFORE seal is broken.</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">2</div> Clearly display the shipping label.</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">3</div> Continuous footage (No cuts or edits).</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">4</div> Explicitly display the claimed issue.</li>
               </ul>
               <div className="p-6 bg-white/10 rounded border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="text-[#ff9900]" size={24} />
                    <h4 className="font-bold text-lg">Important</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">
                    Edited, unclear, cropped, or incomplete media files will be automatically rejected by our verification team.
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Administrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
           {[
             { title: "Review Process", detail: "Requests are reviewed within 24–48 hours. Approval depends on proof verification. Decisions are final.", icon: <Info size={24}/> },
             { title: "Abuse Prevention", detail: "Accounts with repeated or suspicious requests may be restricted. Fraudulent claims result in suspension.", icon: <ShieldCheck size={24}/> },
             { title: "Refunds & Replacements", detail: "Refunds processed to original payment method. Replacements subject to stock availability.", icon: <RefreshCcw size={24}/> },
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white rounded-sm shadow-sm border-t-4 border-transparent hover:border-[#2874f0] transition-colors">
                <div className="text-[#2874f0] mb-4 bg-[#2874f0]/10 w-12 h-12 rounded-full flex items-center justify-center">{item.icon}</div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
             </div>
           ))}
        </div>

        {/* Contact & Acknowledgement */}
        <div className="bg-white p-8 sm:p-12 rounded-sm shadow-sm text-center">
          <div className="mb-10">
            <div className="w-16 h-16 bg-[#ff9900]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#ff9900]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need Support?</h3>
            <p className="text-sm text-gray-500 mb-4">Stay Informed, We'd love to keep you updated with the latest news, exclusive offers, and valuable insights. Please give your consent to receive messages & RCS messages and emails from us.</p>
            <a href="mailto:shubhvaluecart@gmail.com" className="inline-block text-2xl sm:text-3xl font-bold text-[#2874f0] hover:text-[#ff9900] transition-colors">
              shubhvaluecart@gmail.com
            </a>
          </div>

          <div className="max-w-2xl mx-auto pt-8 border-t border-gray-100">
             <div className="flex items-center justify-center space-x-2 mb-4">
                <UserCheck size={18} className="text-green-500" />
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Customer Acknowledgement</span>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wide">
                By placing an order on Shubh Value Cart, you confirm full compliance with this quality assurance system and accept the proof-based return protocol.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
