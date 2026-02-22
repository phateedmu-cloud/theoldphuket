import React, { useState } from 'react';
import Head from 'next/head';
import { Image as ImageIcon, X } from 'lucide-react';

// ✅ 1. Import สมองส่วนกลางและคลังคำแปล
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Gallery() {
  const themeColor = '#E5C595';
  
  // ✅ 2. เรียกใช้งานระบบแปลภาษา
  const { lang } = useLanguage();
  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN']?.[key] || fallbackText || key;
  };

  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null); 

  const roomTypes = [
    { folder: 'deluxe', name: 'Deluxe Room' },
    { folder: 'deluxe-pool-view', name: 'Deluxe Pool View' },
    { folder: 'deluxe-terrace', name: 'Deluxe Terrace' },
    { folder: 'jacuzzi-deluxe', name: 'Jacuzzi Deluxe' },
    { folder: 'deluxe-pool-access', name: 'Pool Access' },
    { folder: 'family-deluxe', name: 'Family Deluxe' }
  ];

  const roomImages = roomTypes.flatMap((room) => 
    [1, 2, 3, 4].map((num) => ({
      src: `/images/rooms/${room.folder}/${String(num).padStart(2, '0')}.jpg`,
      category: 'Rooms',
      alt: `${room.name} - View ${num}`
    }))
  );

  const otherImages = [
    // --- HOTEL ---
    { src: "/images/hotel/exterior-01.jpg", category: "Hotel", alt: "Modern Poolside Facade" },
    { src: "/images/hotel/exterior-07.jpg", category: "Hotel", alt: "Sino-Portuguese Heritage Wing" },
    { src: "/images/hotel/lobby-01.jpg", category: "Hotel", alt: "Grand Lobby" },
    { src: "/images/hotel/corridor-04.jpg", category: "Hotel", alt: "Classic Archway Corridor" },
    { src: "/images/hotel/reception-03.jpg", category: "Hotel", alt: "Reception Area" },
    { src: "/images/hotel/corridor-02.jpg", category: "Hotel", alt: "Serene Walkway" },
    { src: "/images/hotel/corridor-08.jpg", category: "Hotel", alt: "Modern Building Walkway" },
    
    // --- FACILITIES ---
    { src: "/images/facilities/fitness-01.jpg", category: "Facilities", alt: "Fitness Center Main" },
    { src: "/images/facilities/fitness-02.jpg", category: "Facilities", alt: "Cardio Zone" },
    { src: "/images/facilities/fitness-03.jpg", category: "Facilities", alt: "Weight Training" },
    { src: "/images/facilities/kidclub.jpg", category: "Facilities", alt: "Kids Club" },
    { src: "/images/facilities/beach.jpg", category: "Facilities", alt: "Karon Beach" },
    { src: "/images/facilities/General-Facilities.jpg", category: "Facilities", alt: "Main Swimming Pool" },
    { src: "/images/facilities/pool-02.jpg", category: "Facilities", alt: "Relaxing Pool" },
  ];

  const allImages = [...otherImages, ...roomImages].map((img, index) => ({ ...img, id: index + 1 }));

  const filteredImages = filter === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  // ✅ เปลี่ยน Array Category ให้ไปดึงคำแปลด้วย
  const categories = [
    { key: 'All', transKey: 'filter_all' },
    { key: 'Hotel', transKey: 'filter_hotel' },
    { key: 'Rooms', transKey: 'filter_rooms' },
    { key: 'Facilities', transKey: 'filter_facilities' }
  ];

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "The Old Phuket Gallery",
    "description": "Visual journey through The Old Phuket resort, featuring Sino-Portuguese architecture, luxurious rooms, and facilities.",
    "image": allImages.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://theoldphuket.vercel.app${img.src}`,
      "caption": img.alt,
      "name": img.category
    }))
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen">
      <Head>
        <title>Gallery - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="Browse our gallery to see the beauty of The Old Phuket, from Sino-Portuguese architecture to modern pool access rooms." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/images/hotel/exterior-01.jpg" 
            alt="Gallery Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 pt-16">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">
            {t('gall_hero_subtitle', 'Visual Journey')}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg uppercase">
            {t('gall_hero_title', 'OUR GALLERY')}
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- FILTER BUTTONS --- */}
      <div className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-6 flex justify-center flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat.key 
                  ? 'bg-[#E5C595] text-white border-[#E5C595] shadow-lg transform scale-105' 
                  : 'bg-transparent text-gray-400 border-gray-200 hover:border-[#E5C595] hover:text-[#E5C595]'
              }`}
            >
              {t(cat.transKey, cat.key)}
            </button>
          ))}
        </div>
      </div>

      {/* --- GALLERY GRID (MASONRY STYLE) --- */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img)}
              className="group relative overflow-hidden rounded-sm bg-gray-200 aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {e.target.style.display = 'none'}}
              />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-2">
                <p className="text-[#E5C595] text-[10px] font-bold uppercase tracking-widest mb-1">
                  {/* ดึงคำแปลของ Category มาแสดงบนรูปตอน Hover */}
                  {img.category === 'All' ? t('filter_all', 'All') : 
                   img.category === 'Hotel' ? t('filter_hotel', 'Hotel') : 
                   img.category === 'Rooms' ? t('filter_rooms', 'Rooms') : 
                   t('filter_facilities', 'Facilities')}
                </p>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <ImageIcon size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-[#E5C595] transition-colors">
            <X size={40} />
          </button>
          
          <div className="relative max-w-5xl w-full max-h-screen" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            <div className="text-center mt-4">
              {/* ชื่อรูป (Alt) คงเป็นภาษาอังกฤษไว้เพื่อความเท่ แต่หมวดหมู่เปลี่ยนตามภาษา */}
              <h3 className="text-white font-serif text-xl">{selectedImage.alt}</h3>
              <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">
                  {selectedImage.category === 'All' ? t('filter_all', 'All') : 
                   selectedImage.category === 'Hotel' ? t('filter_hotel', 'Hotel') : 
                   selectedImage.category === 'Rooms' ? t('filter_rooms', 'Rooms') : 
                   t('filter_facilities', 'Facilities')}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}