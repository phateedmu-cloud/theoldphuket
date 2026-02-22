import React from 'react';
import Head from 'next/head';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// ✅ 1. Import สมองส่วนกลางและคลังคำแปล
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Contact() {
  const themeColor = '#E5C595';

  // ✅ 2. เรียกใช้งานระบบแปลภาษา
  const { lang } = useLanguage();
  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN']?.[key] || fallbackText || key;
  };

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
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
        <div className="relative z-10 text-center text-white px-4 pt-16">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">
            {t('cont_hero_subtitle', 'Get in Touch')}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg uppercase">
            {t('cont_hero_title', 'CONTACT US')}
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
            <h3 className="text-xl font-serif font-bold mb-4">{t('cont_loc_title', 'Our Location')}</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('cont_loc_desc', '128/1 Karon Road, Muang, Phuket 83100, Thailand')}
            </p>
          </div>

          {/* 2. Phone & Email */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('cont_info_title', 'Contact Info')}</h3>
            <p className="text-gray-500 font-light mb-2">
              <span className="font-bold">{t('cont_info_tel', 'Tel')}:</span> +66 76 123 456
            </p>
            <p className="text-gray-500 font-light">
              <span className="font-bold">{t('cont_info_email', 'Email')}:</span> info@theoldphuket.com
            </p>
          </div>

          {/* 3. Opening Hours */}
          <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-[#E5C595] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#E5C595] mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('cont_hours_title', 'Reception Hours')}</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('cont_hours_desc', 'Open 24 Hours')}<br/>
              {t('cont_hours_check', 'Check-in: 14:00 | Check-out: 12:00')}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.73949826315!2d98.28639205!3d7.84277715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30502e1b1a111111%3A0x1111111111111111!2sThe%20Old%20Phuket%20Karon%20Beach%20Resort!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth" 
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
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">{t('cont_form_subtitle', 'Send us a message')}</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8">{t('cont_form_title', "We'd love to hear from you")}</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('cont_label_name', 'Your Name')}</label>
                  <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder={t('cont_ph_name', 'John Doe')} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('cont_label_email', 'Email Address')}</label>
                  <input type="email" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder={t('cont_ph_email', 'email@example.com')} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('cont_label_subject', 'Subject')}</label>
                <input type="text" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder={t('cont_ph_subject', 'Booking Inquiry')} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t('cont_label_message', 'Message')}</label>
                <textarea rows="4" className="w-full border-b border-gray-300 py-3 focus:border-[#E5C595] focus:outline-none transition-colors" placeholder={t('cont_ph_message', 'How can we help you?')}></textarea>
              </div>

              <button className="bg-gray-900 text-white px-10 py-4 uppercase font-bold tracking-widest text-sm hover:bg-[#E5C595] transition-colors flex items-center mt-4">
                {t('cont_btn_send', 'Send Message')} <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}