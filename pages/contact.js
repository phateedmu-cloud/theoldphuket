import React from 'react';
import Head from 'next/head';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const themeColor = '#E5C595';

  // --- AI-READY: Structured Data for Local Business ---
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
    "image": "https://theoldphuket.vercel.app/images/hotel/reception-03.jpg",
    "telephone": "+6676123455",
    "email": "info@theoldphuket.com",
    "url": "https://theoldphuket.vercel.app/contact",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "128/1 Karon Road",
      "addressLocality": "Muang",
      "addressRegion": "Phuket",
      "postalCode": "83100",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 7.84,
      "longitude": 98.29
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-white min-h-screen">
      <Head>
        <title>Contact Us - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="Contact The Old Phuket at Karon Beach. Find our location, phone number, and email. We are open 24/7 to serve you." />
        
        {/* ✅ ฝังโค้ด AI Schema ข้อมูลติดต่อ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/images/hotel/reception-03.jpg" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Get in Touch</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
            CONTACT US
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- INFO CARDS --- */}
      <div className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          {/* 1. Address */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">Our Location</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              128/1 Karon Road, Muang,<br/>
              Phuket 83100, Thailand
            </p>
          </div>

          {/* 2. Phone & Email */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Info</h3>
            <p className="text-gray-500 font-light mb-2">
              <span className="font-bold">Tel:</span> +66 76 123 456
            </p>
            <p className="text-gray-500 font-light">
              <span className="font-bold">Email:</span> info@theoldphuket.com
            </p>
          </div>

          {/* 3. Opening Hours */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">Reception Hours</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              Open 24 Hours<br/>
              Check-in: 14:00 | Check-out: 12:00
            </p>
          </div>

        </div>
      </div>

      {/* --- MAP & FORM SECTION --- */}
      <div className="container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: Google Map (แก้ไขพิกัดเป็น Karon Beach) */}
          <div className="lg:w-1/2 h-[500px] bg-gray-200 shadow-lg rounded-sm overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15809.683707204946!2d98.29074555!3d7.84277715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30502f61eac8c247%3A0x66596163351d530!2sKaron%20Beach!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:w-1/2">
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Send us a message</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8">We'd love to hear from you</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Your Name</label>
                  <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                  <input type="email" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="email@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Subject</label>
                <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="Booking Inquiry" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
                <textarea rows="4" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="How can we help you?"></textarea>
              </div>

              <button className="bg-gray-900 text-white px-10 py-4 uppercase font-bold tracking-widest text-sm hover:bg-[#E5C595] transition-colors flex items-center mt-4">
                Send Message <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}