/*******************************************************************************
 * ไฟล์: components/sections/HeroSection.js (v6: AI-Integrated + Schema.org)
 ******************************************************************************/

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head'; // เพิ่ม Head เพื่อฝัง Schema.org
import { MagnifyingGlassIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

// 1. ลองดึงข้อมูลจาก OpenClawn (ถ้าไม่มีไฟล์นี้ ให้ใช้ค่าว่าง)
let hotelData = {};
try {
  hotelData = require('../../openclawn_result.json');
} catch (e) {
  // ถ้าหาไฟล์ไม่เจอ ให้ใช้ข้อมูล Default นี้แทน (กันเว็บพัง)
  hotelData = {
    hotelName: "The Old Phuket",
    description_en: "Karon Beach Resort",
    selling_points: ["Luxury Stay", "Best Location", "Free Wifi"]
  };
}

// รายชื่อรูปภาพสไลด์
const heroImages = [
  "/images/hero/main.jpg",
  "/images/hero/main02.jpg",
  "/images/hotel/corridor-05.jpg",
];

export default function HeroSection() {
  // --- ส่วนจัดการ Slideshow ---
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- ส่วนจัดการ Booking Widget ---
  const [counts, setCounts] = useState({ rooms: 1, adults: 2, children: 0 });
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const updateCount = (type, operation) => {
    setCounts(prev => {
      const current = prev[type];
      let newValue = current;
      if (operation === 'inc') {
        newValue = current + 1;
      } else {
        if (type === 'children' && current > 0) newValue = current - 1;
        if (type !== 'children' && current > 1) newValue = current - 1;
      }
      return { ...prev, [type]: newValue };
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsGuestPopupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef]);

  // --- สร้าง Schema.org (ภาษาที่ AI เข้าใจ) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotelData.hotelName,
    "description": hotelData.description_en,
    "image": heroImages.map(img => `https://www.theoldphuket.com${img}`), // ควรเปลี่ยนเป็น URL จริง
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phuket",
      "addressCountry": "TH"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    }
  };

  return (
    <>
      {/* ฝังข้อมูลให้ AI อ่าน (Invisible to humans, Visible to AI) */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <section className="bg-white py-6 md:py-8 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* กล่อง Hero หลัก */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl md:h-[600px]">

            {/* Slideshow */}
            {heroImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`${hotelData.hotelName} Slide ${index + 1}`} // Alt text เป็นชื่อโรงแรมช่วย SEO
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                  className="transition-transform duration-[6000ms] ease-linear transform scale-100 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
              </div>
            ))}

            {/* Headline (ดึงข้อมูลจาก JSON) */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white pb-32 md:pb-40">
              <h1 className="font-serif text-4xl font-bold tracking-wide md:text-6xl lg:text-7xl drop-shadow-lg">
                {hotelData.hotelName || "The Old Phuket"}
              </h1>
              <p className="mt-2 font-serif text-xl font-light tracking-wider md:text-3xl drop-shadow-md text-yellow-300">
                {/* ลองดึงจุดขายจุดแรก หรือคำบรรยายมาโชว์ */}
                {hotelData.selling_points ? hotelData.selling_points[0] : "Karon Beach Resort"}
              </p>
              
              {/* คำบรรยายเพิ่มเติม (ถ้ามี) */}
               {hotelData.description_en && (
                <p className="mt-4 max-w-2xl text-sm md:text-base font-light opacity-90 hidden md:block">
                  {hotelData.description_en}
                </p>
              )}
            </div>

            {/* Booking Widget (คงเดิม) */}
            <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:bottom-10">
              <div className="mx-auto max-w-5xl rounded-2xl bg-black/40 backdrop-blur-md p-6 shadow-xl ring-1 ring-white/20">
                <form className="grid grid-cols-2 gap-4 md:grid-cols-4 items-end relative">
                  {/* Check-in */}
                  <div className="flex flex-col col-span-1">
                    <label className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-200">Check In</label>
                    <input
                      type="text" placeholder="DD/MM/YYYY" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}
                      className="w-full rounded-lg border-0 bg-white/90 p-3 text-sm text-gray-800 focus:ring-2 focus:ring-yellow-500 font-sans"
                    />
                  </div>
                  {/* Check-out */}
                  <div className="flex flex-col col-span-1">
                    <label className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-200">Check Out</label>
                    <input
                      type="text" placeholder="DD/MM/YYYY" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}
                      className="w-full rounded-lg border-0 bg-white/90 p-3 text-sm text-gray-800 focus:ring-2 focus:ring-yellow-500 font-sans"
                    />
                  </div>
                  {/* Guests */}
                  <div className="flex flex-col col-span-2 md:col-span-1 relative" ref={popupRef}>
                    <label className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-200">Guests</label>
                    <button
                      type="button" onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)}
                      className="w-full rounded-lg border-0 bg-white/90 p-3 text-sm text-left text-gray-800 focus:ring-2 focus:ring-yellow-500 font-sans flex justify-between items-center"
                    >
                      <span>{`${counts.rooms} Room, ${counts.adults} Adults, ${counts.children} Child`}</span>
                    </button>
                    {isGuestPopupOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-full min-w-[280px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5 z-50">
                        {/* Rooms Control */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-700">Rooms</span>
                          <div className="flex items-center space-x-3">
                            <button type="button" onClick={() => updateCount('rooms', 'dec')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><MinusIcon className="h-4 w-4" /></button>
                            <span className="w-4 text-center text-sm font-bold text-gray-900">{counts.rooms}</span>
                            <button type="button" onClick={() => updateCount('rooms', 'inc')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><PlusIcon className="h-4 w-4" /></button>
                          </div>
                        </div>
                        {/* Adults Control */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div className="flex flex-col"><span className="text-sm font-medium text-gray-700">Adults</span><span className="text-xs text-gray-400">Ages 12+</span></div>
                          <div className="flex items-center space-x-3">
                            <button type="button" onClick={() => updateCount('adults', 'dec')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><MinusIcon className="h-4 w-4" /></button>
                            <span className="w-4 text-center text-sm font-bold text-gray-900">{counts.adults}</span>
                            <button type="button" onClick={() => updateCount('adults', 'inc')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><PlusIcon className="h-4 w-4" /></button>
                          </div>
                        </div>
                        {/* Children Control */}
                        <div className="flex items-center justify-between py-3">
                          <div className="flex flex-col"><span className="text-sm font-medium text-gray-700">Children</span><span className="text-xs text-gray-400">Ages 0-11</span></div>
                          <div className="flex items-center space-x-3">
                            <button type="button" onClick={() => updateCount('children', 'dec')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><MinusIcon className="h-4 w-4" /></button>
                            <span className="w-4 text-center text-sm font-bold text-gray-900">{counts.children}</span>
                            <button type="button" onClick={() => updateCount('children', 'inc')} className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 text-gray-600"><PlusIcon className="h-4 w-4" /></button>
                          </div>
                        </div>
                        <button type="button" onClick={() => setIsGuestPopupOpen(false)} className="mt-2 w-full rounded-lg bg-yellow-600 py-2 text-sm font-bold text-white hover:bg-yellow-700">Done</button>
                      </div>
                    )}
                  </div>
                  {/* Search Button */}
                  <button type="button" className="col-span-2 md:col-span-1 flex w-full items-center justify-center rounded-lg bg-yellow-600 p-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-yellow-700 hover:shadow-xl">
                    <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
                    CHECK RATES
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}