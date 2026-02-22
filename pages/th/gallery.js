import React, { useState } from 'react';
import Head from 'next/head';
import { Image as ImageIcon, X } from 'lucide-react';

export default function GalleryTH() {
  const themeColor = '#E5C595';
  
  // 🚩 State
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null); // State สำหรับเปิดดูรูปใหญ่ (Lightbox)

  // 1. สร้างรายการรูปภาพหมวด "ห้องพัก" (สร้างชื่อไฟล์อัตโนมัติ 01-04)
  const roomTypes = [
    { folder: 'deluxe', name: 'ห้องดีลักซ์' },
    { folder: 'deluxe-pool-view', name: 'ดีลักซ์ วิวสระว่ายน้ำ' },
    { folder: 'deluxe-terrace', name: 'ดีลักซ์ เทอเรซ' },
    { folder: 'jacuzzi-deluxe', name: 'จากุซซี่ ดีลักซ์' },
    { folder: 'deluxe-pool-access', name: 'พูล แอคเซส' },
    { folder: 'family-deluxe', name: 'แฟมิลี่ ดีลักซ์' }
  ];

  const roomImages = roomTypes.flatMap((room) => 
    [1, 2, 3, 4].map((num) => ({
      src: `/images/rooms/${room.folder}/${String(num).padStart(2, '0')}.jpg`,
      category: 'Rooms',
      alt: `${room.name} - มุมที่ ${num}`
    }))
  );

  // 2. รายการรูปภาพหมวด "โรงแรม" & "สิ่งอำนวยความสะดวก" (Manual List)
  const otherImages = [
    // --- HOTEL ---
    { src: "/images/hotel/exterior-01.jpg", category: "Hotel", alt: "อาคารสไตล์โมเดิร์นริมสระ" },
    { src: "/images/hotel/exterior-07.jpg", category: "Hotel", alt: "ตึกชิโนโปรตุกีส" },
    { src: "/images/hotel/lobby-01.jpg", category: "Hotel", alt: "ล็อบบี้ต้อนรับ" },
    { src: "/images/hotel/corridor-04.jpg", category: "Hotel", alt: "ทางเดินซุ้มโค้ง" },
    { src: "/images/hotel/reception-03.jpg", category: "Hotel", alt: "แผนกต้อนรับ" },
    { src: "/images/hotel/corridor-02.jpg", category: "Hotel", alt: "มุมพักผ่อน" },
    
    // --- FACILITIES ---
    { src: "/images/facilities/fitness-01.jpg", category: "Facilities", alt: "ฟิตเนส เซ็นเตอร์" },
    { src: "/images/facilities/kidclub.jpg", category: "Facilities", alt: "คิดส์คลับ" },
    { src: "/images/facilities/beach.jpg", category: "Facilities", alt: "ชายหาดกะรน" },
    { src: "/images/facilities/pool-01.jpg", category: "Facilities", alt: "สระว่ายน้ำหลัก" },
  ];

  // รวมรูปทั้งหมดเข้าด้วยกัน (ให้ Hotel ขึ้นก่อน)
  const allImages = [...otherImages, ...roomImages].map((img, index) => ({ ...img, id: index + 1 }));

  // กรองรูปภาพตามหมวดหมู่
  const filteredImages = filter === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  // ตัวเลือกหมวดหมู่ (ภาษาไทย)
  const categories = [
    { id: 'All', label: 'ทั้งหมด' },
    { id: 'Hotel', label: 'บรรยากาศโรงแรม' },
    { id: 'Rooms', label: 'ห้องพัก' },
    { id: 'Facilities', label: 'สิ่งอำนวยความสะดวก' }
  ];

  // --- AI-READY: Structured Data (Schema.org) ภาษาไทย ---
  const gallerySchemaTH = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "แกลเลอรีรูปภาพ The Old Phuket",
    "description": "ชมภาพบรรยากาศโรงแรม The Old Phuket รีสอร์ทหรูสไตล์ชิโนโปรตุกีส ห้องพักติดสระว่ายน้ำ และสิ่งอำนวยความสะดวกครบครันบนหาดกะรน",
    "image": allImages.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://theoldphuket.vercel.app${img.src}`,
      "caption": img.alt,
      "name": img.category === 'Rooms' ? 'ห้องพัก' : img.category === 'Hotel' ? 'บรรยากาศ' : 'สิ่งอำนวยความสะดวก'
    }))
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen">
      <Head>
        <title>แกลเลอรี - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="ชมภาพสวยๆ ของ The Old Phuket ทั้งห้องพักสไตล์ชิโนโปรตุกีส สระว่ายน้ำ และบรรยากาศริมหาดกะรน" />
        
        {/* ✅ ฝังโค้ด AI Schema ภาษาไทย */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchemaTH) }}
        />
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
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Visual Journey</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
            แกลเลอรีของเรา
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- FILTER BUTTONS --- */}
      <div className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-6 flex justify-center flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat.id 
                  ? 'bg-[#E5C595] text-white border-[#E5C595] shadow-lg transform scale-105' 
                  : 'bg-transparent text-gray-400 border-gray-200 hover:border-[#E5C595] hover:text-[#E5C595]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- GALLERY GRID --- */}
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
                onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
              />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-2">
                <p className="text-[#E5C595] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {img.category === 'Rooms' ? 'ห้องพัก' : img.category === 'Hotel' ? 'บรรยากาศ' : 'สิ่งอำนวยความสะดวก'}
                </p>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <ImageIcon size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX (หน้าต่างดูรูปใหญ่) --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
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
              <h3 className="text-white font-serif text-xl">{selectedImage.alt}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}