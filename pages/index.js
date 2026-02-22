import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { ChevronRight, Star, Wifi, Coffee, MapPin, ArrowRight, Calendar, Users, Search } from 'lucide-react'; 
import homepageData from '../data/homepage_data.json';

// Import สมองส่วนกลางและคลังคำแปล
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const themeColor = '#E5C595';
  
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // เรียกใช้งานระบบแปลภาษา
  const { lang } = useLanguage();
  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN'][key];
  };

  const heroImages = [
    "/images/hero/main.jpg",
    "/images/hero/main02.jpg",
    "/images/hero/main03.jpg"
  ];

  // ✅ เปลี่ยนคำอธิบายห้องให้ดึงจากไฟล์แปลภาษา
  const featuredRooms = [
    {
      name: "Deluxe Pool Access",
      image: "/images/rooms/deluxe-pool-access/01.jpg",
      descKey: "room1_desc"
    },
    {
      name: "Jacuzzi Deluxe",
      image: "/images/rooms/jacuzzi-deluxe/01.jpg",
      descKey: "room2_desc"
    },
    {
      name: "Family Deluxe",
      image: "/images/rooms/family-deluxe/01.jpg",
      descKey: "room3_desc"
    }
  ];

  const { hotelInfo } = homepageData;

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
    "description": "Sino-Portuguese Charm on Karon Beach. Where heritage meets modern luxury.",
    "image": ["https://theoldphuket.vercel.app/images/hero/main.jpg"],
    "url": "https://theoldphuket.vercel.app",
    "telephone": "+6676123456",
    "address": {
      "@type": "PostalAddress", "streetAddress": "128/1 Karon Road", "addressLocality": "Muang",
      "addressRegion": "Phuket", "postalCode": "83100", "addressCountry": "TH"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 7.84, "longitude": 98.29 },
    "priceRange": "฿฿฿",
    "starRating": { "@type": "Rating", "ratingValue": "4.5" }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`);
  };

  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
      <Head>
        <title>{hotelInfo.name} - Karon Beach Resort</title>
      </Head>

      {/* --- HERO SLIDESHOW --- */}
      <div style={{ position: 'relative', height: '100vh', minHeight: '800px', width: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
        {heroImages.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              opacity: currentSlide === index ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: 0
            }}
          >
            <img src={img} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full pt-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4 drop-shadow-md text-white font-bold">
            WELCOME TO KARON BEACH
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-2 leading-tight drop-shadow-lg text-[#E5C595] tracking-wide">
            THE OLD PHUKET
          </h1>
          <h2 className="text-xl md:text-3xl font-serif mb-10 drop-shadow-md text-white tracking-[0.2em] font-light">
            KARON BEACH RESORT
          </h2>
          <div className="w-24 h-1 mb-12 shadow-sm" style={{ backgroundColor: themeColor }}></div>
          
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-sm shadow-lg mt-4">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end text-left">
              <div className="flex flex-col">
                <label className="text-white text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2 drop-shadow-md">
                  <Calendar size={14} className="text-[#E5C595]"/> {t('check_in')}
                </label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-white/95 text-gray-900 py-3 px-4 outline-none focus:ring-2 focus:ring-[#E5C595] text-sm font-bold rounded-sm transition-all w-full shadow-inner" required />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2 drop-shadow-md">
                  <Calendar size={14} className="text-[#E5C595]"/> {t('check_out')}
                </label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-white/95 text-gray-900 py-3 px-4 outline-none focus:ring-2 focus:ring-[#E5C595] text-sm font-bold rounded-sm transition-all w-full shadow-inner" required />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2 drop-shadow-md">
                  <Users size={14} className="text-[#E5C595]"/> {t('adults')}
                </label>
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="bg-white/95 text-gray-900 py-3 px-4 outline-none focus:ring-2 focus:ring-[#E5C595] text-sm font-bold rounded-sm cursor-pointer w-full shadow-inner">
                  {[1, 2, 3, 4, 5, 6].map(num => <option key={`adult-${num}`} value={num}>{num}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2 drop-shadow-md">
                  <Users size={14} className="text-[#E5C595]"/> {t('children')}
                </label>
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="bg-white/95 text-gray-900 py-3 px-4 outline-none focus:ring-2 focus:ring-[#E5C595] text-sm font-bold rounded-sm cursor-pointer w-full shadow-inner">
                  {[0, 1, 2, 3, 4].map(num => <option key={`child-${num}`} value={num}>{num}</option>)}
                </select>
              </div>
              <button type="submit" className="bg-[#E5C595] hover:bg-[#d4b07e] text-gray-900 py-3 px-4 font-bold tracking-[0.2em] text-[10px] uppercase transition-all flex items-center justify-center gap-2 rounded-sm shadow-xl h-[44px] md:h-[48px] w-full">
                <Search size={16} /> {t('search_btn')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- STORY SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5C595]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src="/images/hotel/corridor-04.jpg" alt="Sino Portuguese Architecture" className="w-full h-80 object-cover rounded-sm shadow-lg transform translate-y-8" />
                  <img src="/images/hotel/exterior-01.jpg" alt="Modern Pool Side" className="w-full h-80 object-cover rounded-sm shadow-lg -translate-y-8" />
               </div>
               <div className="absolute inset-4 border-2 border-[#E5C595] -z-10 rounded-sm hidden md:block"></div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
               <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">{t('discover_heritage')}</p>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-800 leading-tight">
                 {t('heritage_meets')} <br/>
                 <span style={{ color: themeColor }}>{t('modern_luxury')}</span>
               </h2>
               <p className="text-gray-500 text-lg font-light leading-relaxed mb-6">{t('story_p1')}</p>
               <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">{t('story_p2')}</p>
               <Link href="/gallery">
                 <button className="inline-flex items-center text-[#E5C595] font-bold uppercase tracking-widest hover:text-[#d4b07e] transition-colors border-b-2 border-[#E5C595] pb-1">
                   {t('explore_gallery')} <ArrowRight size={18} className="ml-2" />
                 </button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED ROOMS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">{t('accommodations')}</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-800">{t('stay_style')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <div key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow group">
                <div className="h-64 overflow-hidden relative">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 text-center">
                  {/* ชื่อห้องเป็นภาษาอังกฤษเสมอเหมือนชื่อโรงแรม */}
                  <h3 className="text-xl font-serif font-bold mb-3" style={{ color: themeColor }}>{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{t(room.descKey)}</p>
                  <Link href="/accommodation">
                    <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-[#E5C595] pb-1 transition-all">
                      {t('view_details')}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FACILITIES PREVIEW --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
               <img src="/images/hero/main02.jpg" className="w-full h-full object-cover shadow-2xl" alt="Facility" />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-xl hidden md:block">
                 <p className="font-serif text-2xl italic text-gray-800">{t('relax_quote')}</p>
               </div>
            </div>
            <div className="pl-0 md:pl-10">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">{t('our_facilities')}</h3>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">{t('experience_luxury')}</h2>
              <p className="text-gray-500 mb-8 leading-relaxed font-light text-lg">{t('fac_desc')}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-600"><Wifi className="mr-2" size={20}/> {t('free_wifi')}</div>
                <div className="flex items-center text-gray-600"><Coffee className="mr-2" size={20}/> {t('dining')}</div>
                <div className="flex items-center text-gray-600"><Star className="mr-2" size={20}/> {t('pool')}</div>
                <div className="flex items-center text-gray-600"><MapPin className="mr-2" size={20}/> {t('location')}</div>
              </div>
              <Link href="/facilities">
                <button className="text-[#E5C595] font-bold uppercase tracking-wider flex items-center hover:ml-2 transition-all">
                  {t('discover_more')} <ChevronRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}