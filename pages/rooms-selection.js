import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Tag, Zap, ChevronRight, Info, Maximize, Users, Bed, ChevronLeft } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function RoomsSelection() {
  const router = useRouter();
  const { checkIn, checkOut, adults, children } = router.query;
  
  const [availableRooms, setAvailableRooms] = useState([]);
  const [marketBasePrice, setMarketBasePrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();
  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN']?.[key] || fallbackText || key;
  };

  useEffect(() => {
    if (router.isReady) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [roomRes, priceRes] = await Promise.all([
            fetch(`/api/search-rooms?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`),
            fetch(`/api/get-market-price?checkIn=${checkIn}&checkOut=${checkOut}`)
          ]);

          const roomResult = await roomRes.json();
          const priceResult = await priceRes.json();

          if (roomResult.success) setAvailableRooms(roomResult.data);
          if (priceResult.success) {
            setMarketBasePrice(priceResult.marketPrice);
          }
        } catch (error) {
          console.error("Data fetching failed", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [router.isReady, checkIn, checkOut, adults, children]);

  // ✅ เพิ่มระบบค้นหา "คีย์คำแปล" (descKey) เข้าไปในฟังก์ชันคำนวณราคาห้อง
  const getRoomMeta = (roomName, baseMarketPrice) => {
    let adjustment = 0;
    let folder = "deluxe";
    let descKey = "desc_deluxe"; // ค่าตั้งต้นคือคำแปลห้อง Deluxe
    const name = roomName.toLowerCase();
    
    // ตรวจสอบชื่อห้องและดึงคีย์คำแปลที่ตรงกัน
    if (name.includes('pool access')) { adjustment = 1500; folder = "deluxe-pool-access"; descKey = "desc_pool_access"; }
    else if (name.includes('family')) { adjustment = 2500; folder = "family-deluxe"; descKey = "desc_family"; }
    else if (name.includes('pool view')) { adjustment = 700; folder = "deluxe-pool-view"; descKey = "desc_pool_view"; }
    else if (name.includes('terrace')) { adjustment = 500; folder = "deluxe-terrace"; descKey = "desc_terrace"; }
    else if (name.includes('jacuzzi')) { adjustment = 2000; folder = "jacuzzi-deluxe"; descKey = "desc_jacuzzi"; }
    else { folder = "deluxe"; descKey = "desc_deluxe"; }

    const marketPrice = baseMarketPrice + adjustment;
    const ourPrice = Math.floor(marketPrice * 0.9);
    
    const images = Array.from({ length: 10 }, (_, i) => `/images/rooms/${folder}/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // ส่งค่า descKey กลับไปให้หน้าเว็บใช้ด้วย
    return { marketPrice, ourPrice, discount: marketPrice - ourPrice, images, descKey };
  };

  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); };
    const prevSlide = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); };

    return (
      <div className="relative h-full w-full overflow-hidden group bg-gray-100">
        <img 
          src={images[currentIndex]} 
          alt="Room View" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=The+Old+Phuket+Sanctuary"; }}
        />
        <button type="button" onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-[#E5C595] w-4' : 'bg-white/50'}`}></div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#E5C595] rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-gray-400 animate-pulse uppercase tracking-[0.3em] text-[10px]">
          {t('ai_matching', 'AI Matching Market Rates...')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans antialiased">
      <Head><title>Select Room - The Old Phuket | AI Real-time</title></Head>

      <div className="pt-24 bg-gray-900 text-white pb-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight uppercase italic mb-4">
              {t('choose_sanctuary', 'Choose Your Sanctuary')}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              <p className="text-[#E5C595] text-[10px] tracking-[0.3em] uppercase font-bold border border-[#E5C595]/30 px-3 py-1 bg-gray-900">
                {checkIn} — {checkOut}
              </p>
              <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-light">
                {adults} {t('adults', 'Adults')}, {children} {t('children', 'Children')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-sm shadow-2xl mt-8 md:mt-0">
            <Zap size={16} className="text-[#E5C595] fill-[#E5C595]" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#E5C595]">
              {t('ai_price_match', 'AI Price Match Active')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-4 space-y-12">
        {availableRooms.length === 0 ? (
          <div className="text-center py-32 bg-white shadow-xl rounded-sm">
            <p className="text-gray-400 font-serif italic text-lg uppercase tracking-widest">
              {t('no_rooms', 'No rooms available for these dates.')}
            </p>
          </div>
        ) : (
          availableRooms.map((room) => {
            const meta = getRoomMeta(room.name, marketBasePrice);

            return (
              <div key={room.id} className="bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 group transition-all duration-500">
                
                {/* Left: 10 Image Slider */}
                <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                  <ImageSlider images={meta.images} />
                  <div className="absolute top-6 left-6 z-10 bg-gray-900/90 text-[#E5C595] px-4 py-2 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                    {t('official_rate', 'Official Rate')}
                  </div>
                </div>

                {/* Right: Info & Dynamic Price */}
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    {/* ชื่อห้องเป็นภาษาอังกฤษเสมอ */}
                    <h3 className="text-3xl font-serif font-bold text-gray-800 uppercase mb-6 tracking-tight">{room.name}</h3>
                    <div className="flex gap-6 mb-8 text-gray-400">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold"><Maximize size={16} className="text-[#E5C595]" /> {room.size}</div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold"><Users size={16} className="text-[#E5C595]" /> {room.guests}</div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold"><Bed size={16} className="text-[#E5C595]" /> {room.bed}</div>
                    </div>
                    
                    {/* ✅ ส่วนที่แปลคำอธิบายห้องพัก */}
                    <p className="text-gray-400 font-light text-sm italic border-l-2 border-[#E5C595] pl-6 mb-10 leading-relaxed">
                      {t(meta.descKey, room.description || "A masterfully crafted space blending Phuket's rich heritage with contemporary elegance.")}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-gray-300 line-through">
                          {t('market_price', 'Market')}: THB {meta.marketPrice.toLocaleString()}
                        </span>
                        <span className="bg-green-50 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {t('save_thb', 'Save')} THB {meta.discount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-serif font-bold text-gray-900 tracking-tighter italic">THB {meta.ourPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                          {t('per_night', '/ Night')}
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => router.push(`/book?roomTypeId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&finalPrice=${meta.ourPrice}`)}
                      className="bg-gray-900 text-white px-12 py-5 font-bold tracking-[0.3em] text-[10px] uppercase hover:bg-[#E5C595] hover:text-gray-900 transition-all shadow-2xl flex items-center justify-center gap-3"
                    >
                      {t('select_room', 'Select Room')} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}