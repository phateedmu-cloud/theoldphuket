import React from 'react';
import Head from 'next/head';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactTH() {
  const themeColor = '#E5C595';

  // --- AI-READY: Structured Data (Schema.org) ภาษาไทย ---
  const contactSchemaTH = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket (ดิ โอลด์ ภูเก็ต)",
    "image": "https://theoldphuket.vercel.app/images/hotel/reception-03.jpg",
    "telephone": "+6676123456",
    "email": "info@theoldphuket.com",
    "url": "https://theoldphuket.vercel.app/th/contact",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "128/1 ถนนกะรน",
      "addressLocality": "เมือง",
      "addressRegion": "ภูเก็ต",
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
        <title>ติดต่อเรา - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="ติดต่อโรงแรม The Old Phuket หาดกะรน ข้อมูลที่อยู่ เบอร์โทรศัพท์ และอีเมล แผนกต้อนรับบริการ 24 ชั่วโมง" />
        
        {/* ✅ ฝังโค้ด AI Schema ข้อมูลติดต่อ (ภาษาไทย) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchemaTH) }}
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
            ติดต่อเรา
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
            <h3 className="text-xl font-serif font-bold mb-4">ที่อยู่ของเรา</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              128/1 ถนนกะรน อำเภอเมือง<br/>
              จังหวัดภูเก็ต 83100
            </p>
          </div>

          {/* 2. Phone & Email */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">ข้อมูลการติดต่อ</h3>
            <p className="text-gray-500 font-light mb-2">
              <span className="font-bold">โทรศัพท์:</span> +66 76 123 456
            </p>
            <p className="text-gray-500 font-light">
              <span className="font-bold">อีเมล:</span> info@theoldphuket.com
            </p>
          </div>

          {/* 3. Opening Hours */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">เวลาทำการแผนกต้อนรับ</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              เปิดบริการ 24 ชั่วโมง<br/>
              เช็คอิน: 14:00 น. | เช็คเอาท์: 12:00 น.
            </p>
          </div>

        </div>
      </div>

      {/* --- MAP & FORM SECTION --- */}
      <div className="container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: Google Map */}
          <div className="lg:w-1/2 h-[500px] bg-gray-200 shadow-lg rounded-sm overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31611.387978280674!2d98.2936749!3d7.8359265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3050256426746813%3A0x6291a847053e185c!2sKaron%20Beach!5e0!3m2!1sen!2sth!4v1683876543210!5m2!1sen!2sth" 
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
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8">ส่งข้อความถึงเรา</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">ชื่อ - นามสกุล</label>
                  <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="ระบุชื่อของคุณ" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">อีเมล</label>
                  <input type="email" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="email@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">หัวข้อเรื่อง</label>
                <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="สอบถามข้อมูลห้องพัก" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">ข้อความ</label>
                <textarea rows="4" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder="พิมพ์ข้อความของคุณที่นี่..."></textarea>
              </div>

              <button className="bg-gray-900 text-white px-10 py-4 uppercase font-bold tracking-widest text-sm hover:bg-[#E5C595] transition-colors flex items-center mt-4">
                ส่งข้อความ <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}