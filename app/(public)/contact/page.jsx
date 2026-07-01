'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#2874f0]" />,
      title: "Store Location",
      details: "Shubh Value Cart, Dholpur, Rajasthan 328001, India",
      action: "Get Directions",
      link: "https://maps.app.goo.gl/ncwArcCqCxLmbBux8"
    },
    {
      icon: <Phone className="w-6 h-6 text-[#2874f0]" />,
      title: "Phone Number",
      details: "+91 9509086545\n+91 9006848596",
      action: "Call Now",
      link: "tel:+919509086545"
    },
    {
      icon: <Mail className="w-6 h-6 text-[#2874f0]" />,
      title: "Email Address",
      details: "shubhvaluecart@gmail.com",
      action: "Send Email",
      link: "mailto:shubhvaluecart@gmail.com"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#2874f0]" />,
      title: "Working Hours",
      details: "Monday - Sunday\n08:30 AM - 10:30 PM",
      action: "Open Today",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pt-[100px] md:pt-[140px] pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-base md:text-lg font-medium"
          >
            Have a question about our products, your order, or just want to say hi? We'd love to hear from you. Visit our store in Dholpur or drop us a message!
          </motion.p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {contactInfo.map((info, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#2874f0] group-hover:text-white transition-colors duration-300">
                {React.cloneElement(info.icon, { className: "w-6 h-6 transition-colors duration-300 group-hover:text-white" })}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 text-sm font-medium whitespace-pre-line mb-4 flex-grow">{info.details}</p>
              {info.link ? (
                <a 
                  href={info.link} 
                  target={info.title === "Store Location" ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="text-[#2874f0] text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  {info.action} <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                  {info.action}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-[#ff9900] w-8 h-8" />
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="font-medium">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] outline-none transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] outline-none transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] outline-none transition-all font-medium"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] outline-none transition-all font-medium"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] outline-none transition-all font-medium resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                  </div>
                  <div className="py-4">
                    <p>Stay Informed, We'd love to keep you updated with the latest news, exclusive offers, and valuable insights. Please give your consent to receive messages and emails from us.</p>
                  </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#2874f0] hover:bg-[#1a5ec4] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Store Image & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Store Image */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 h-64 md:h-80 relative overflow-hidden group">
              {/* Note: Using a placeholder image since the uploaded image cannot be directly referenced via URL. 
                  Please replace the src below with your actual uploaded image path if you host it. */}
              <img 
                src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-04-12%20000842.png?q=80&w=1000&auto=format&fit=crop" 
                alt="Shubh Value Cart Storefront" 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold drop-shadow-md">Shubh Value Cart</h3>
                <p className="text-white/90 font-medium text-sm drop-shadow-md">Dholpur, Rajasthan</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 h-64 md:h-80 relative flex-grow">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.5401614274!2d77.81831155!3d26.7013809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973e50058b20163%3A0x6e2c391717316712!2sDholpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1712850000000!5m2!1sen!2sin" 
                className="w-full h-full rounded-xl border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Shubh Value Cart Location"
              ></iframe>
              
              <a 
                href="https://maps.app.goo.gl/ncwArcCqCxLmbBux8" 
                target="_blank" 
                rel="noreferrer"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#2874f0] px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-[#2874f0] hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <MapPin size={18} /> Open in Google Maps
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
