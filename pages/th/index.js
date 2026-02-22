import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, Star, Wifi, Coffee, MapPin, ArrowRight } from 'lucide-react';
// import homepageData from '../../data/homepage_data.json'; // เก็บไว้เผื่อใช้ในอนาคต

export default function ThaiHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const themeColor = '#E5C595';

  const heroImages = [
    "/images/hero/main.jpg",
    "/images/hero/main02.jpg",
    "/images/hero/main03.jpg"
  ];

  const featuredRooms = [
    {
      name: "Deluxe Pool Access",
      image: "/images/rooms/deluxe-pool-access/01.jpg",
      desc: "ก้าวลงสระว่ายน้ำได้โดยตรงจากระเบียงส่วนตัวของคุณ"
    },
    {
      name: "Jacuzzi Deluxe",
      image: "/images/rooms/jacuzzi-deluxe/01.jpg",
      desc: "ผ่อนคลายในจากุซซี่ส่วนตัวท่ามกลางบรรยากาศสุดโรแมนติก"
    },
    {
      name: "Family Deluxe",
      image: "/images/rooms/family-deluxe/01.jpg",
      desc: "พื้นที่กว้างขวางสำหรับครอบครัว พร้อมเตียงสองชั้นสำหรับเด็กๆ"
    }
  ];

  // --- AI-READY: Structured Data (Schema.org) ภาษาไทย ---
  // บอก AI ว่าเราคือโรงแรม (ภาษาไทย)
  const hotelSchemaTH = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket (ดิ โอลด์ ภูเก็ต)",
    "description": "รีสอร์ทหรูสไตล์ชิโนโปรตุกีส บนหาดกะรน ภูเก็ต ผสานความงดงามแห่งอดีตเข้ากับความทันสมัย พร้อมห้องพักติดสระว่ายน้ำและสิ่งอำนวยความสะดวกครบครัน",
    "image": [
      "https://theoldphuket.vercel.app/images/hero/main.jpg",
      "https://theoldphuket.vercel.app/images/hero/main02.jpg"
    ],
    "url": "https://theoldphuket.vercel.app/th",
    "telephone": "+6676123456",
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
    "priceRange": "฿฿฿",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4.5"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "สระว่ายน้ำ", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "ฟรี Wi-Fi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "ห้องอาหาร", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "ฟิตเนส", "value": true }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
      <Head>
        <title>The Old Phuket - รีสอร์ทหรูสไตล์ชิโนโปรตุกีส (หาดกะรน)</title>
        <meta name="description" content="สัมผัสเสน่ห์แห่งชิโนโปรตุกีสที่ The Old Phuket รีสอร์ทหรูบนหาดกะรน พักผ่อนในบรรยากาศส่วนตัว พร้อมสระว่ายน้ำและบริการระดับ 5 ดาว" />
        
        {/* ✅ ฝังโค้ด AI สำหรับภาษาไทย */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchemaTH) }}
        />
      </Head>

      {/* --- HERO SLIDESHOW --- */}
      <div style={{ position: 'relative', height: '85vh', width: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
        {heroImages.map((img, index) => (
          <div key={index} style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              opacity: currentSlide === index ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: 0
            }}>
            <img src={img} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4" style={{ color: themeColor }}>
          <p className="text-sm uppercase tracking-[0.3em] mb-4 drop-shadow-md">ยินดีต้อนรับสู่</p>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
            THE OLD PHUKET<br/>
            <span className="text-2xl md:text-5xl font-light">Karon Beach Resort</span>
          </h1>
          <div className="w-24 h-1 mb-8 shadow-sm" style={{ backgroundColor: themeColor }}></div>
          
          <Link href="/th/accommodation">
            <button className="border-2 px-8 py-3 uppercase tracking-widest font-semibold transition-all shadow-lg hover:bg-white hover:text-gray-900" style={{ borderColor: themeColor, color: themeColor }}>
              ดูห้องพักของเรา
            </button>
          </Link>
        </div>
      </div>

      {/* --- STORY SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5C595]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src="/images/hotel/corridor-04.jpg" alt="Sino Charm" className="w-full h-80 object-cover rounded-sm shadow-lg transform translate-y-8"/>
                  <img src="/images/hotel/exterior-01.jpg" alt="Modern Vibe" className="w-full h-80 object-cover rounded-sm shadow-lg -translate-y-8" />
               </div>
               <div className="absolute inset-4 border-2 border-[#E5C595] -z-10 rounded-sm hidden md:block"></div>
            </div>

            <div className="md:w-1/2 text-center md:text-left">
               <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Discover Our Heritage</p>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-800 leading-tight">
                 มนต์เสน่ห์แห่งอดีต <br/>
                 <span style={{ color: themeColor }}>ผสานความหรูหราทันสมัย</span>
               </h2>
               <p className="text-gray-500 text-lg font-light leading-relaxed mb-6">
                 ดื่มด่ำกับบรรยากาศอันเป็นเอกลักษณ์ที่ <strong>The Old Phuket</strong> ที่ซึ่งสองยุคสมัยมาบรรจบกันอย่างลงตัว 
                 สัมผัสความงดงามคลาสสิกของ <strong>Sino Wing</strong> ที่ได้รับแรงบันดาลใจจากสถาปัตยกรรมชิโนโปรตุกีสอันทรงคุณค่าของภูเก็ต
               </p>
               <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
                 หรือเลือกพักผ่อนในสไตล์คอนเทมโพรารีที่ <strong>Serene Wing</strong> ที่ออกแบบมาเพื่อการพักผ่อนที่ทันสมัย 
                 โปร่งสบาย และสามารถเดินลงสระว่ายน้ำได้จากห้องพัก ไม่ว่าคุณจะชอบสไตล์ไหน เราพร้อมมอบประสบการณ์การพักผ่อนที่สมบูรณ์แบบ
               </p>
               <Link href="/th/gallery">
                 <button className="inline-flex items-center text-[#E5C595] font-bold uppercase tracking-widest hover:text-[#d4b07e] transition-colors border-b-2 border-[#E5C595] pb-1">
                   ชมภาพบรรยากาศ <ArrowRight size={18} className="ml-2" />
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
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Accommodations</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-800">พักผ่อนอย่างมีสไตล์</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <div key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow group">
                <div className="h-64 overflow-hidden relative">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-serif font-bold mb-3" style={{ color: themeColor }}>{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{room.desc}</p>
                  <Link href="/th/accommodation">
                    <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-[#E5C595] pb-1 transition-all">
                      ดูรายละเอียด
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
            </div>
            <div className="pl-0 md:pl-10">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Our Facilities</h3>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">สัมผัสประสบการณ์เหนือระดับ</h2>
              <p className="text-gray-500 mb-8 leading-relaxed font-light text-lg">
                เพลิดเพลินไปกับสิ่งอำนวยความสะดวกครบครันที่เราคัดสรรมาเพื่อวันพักผ่อนของคุณ 
                ไม่ว่าจะเป็นสระว่ายน้ำระบบเกลือที่ใสสะอาด ห้องอาหารที่พร้อมเสิร์ฟรสชาติไทยแท้และอินเตอร์ 
                ท่ามกลางกลิ่นอายความคลาสสิกที่คุณจะประทับใจมิรู้ลืม
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-600"><Wifi className="mr-2" size={20}/> ฟรี Wifi</div>
                <div className="flex items-center text-gray-600"><Coffee className="mr-2" size={20}/> ห้องอาหาร</div>
                <div className="flex items-center text-gray-600"><Star className="mr-2" size={20}/> สระว่ายน้ำ</div>
                <div className="flex items-center text-gray-600"><MapPin className="mr-2" size={20}/> ทำเลดีเยี่ยม</div>
              </div>
              <Link href="/th/facilities">
                <button className="text-[#E5C595] font-bold uppercase tracking-wider flex items-center hover:ml-2 transition-all">
                  ดูเพิ่มเติม <ChevronRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}