import React, { useState } from 'react';
import Head from 'next/head';
import { ChevronRight, ChevronLeft, Users, Maximize, Bed, Sun } from 'lucide-react';

export default function AccommodationTH() {
  const themeColor = '#E5C595';

  // 🚩 ข้อมูลห้องพัก (ภาษาไทย) - นำราคาออกแล้ว
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      size: "42 ตร.ม.",
      guests: "ผู้ใหญ่ 2 ท่าน",
      bed: "เตียงคิง / เตียงคู่",
      view: "วิวสวน / วิวเมือง",
      desc: "สัมผัสเสน่ห์สถาปัตยกรรมชิโนโปรตุกีสที่ผสมผสานความสะดวกสบายทันสมัย ห้องพักกว้างขวางพร้อมระเบียงส่วนตัวและสิ่งอำนวยความสะดวกครบครันเพื่อการพักผ่อนที่สมบูรณ์แบบ",
      images: [
        "/images/rooms/deluxe/01.jpg",
        "/images/rooms/deluxe/02.jpg",
        "/images/rooms/deluxe/03.jpg",
        "/images/rooms/deluxe/04.jpg"
      ]
    },
    {
      id: 2,
      name: "Deluxe Pool View",
      size: "45 ตร.ม.",
      guests: "ผู้ใหญ่ 2 ท่าน",
      bed: "เตียงคิง / เตียงคู่",
      view: "วิวสระว่ายน้ำ",
      desc: "เพลิดเพลินกับวิวสระว่ายน้ำที่ระยิบระยับจากระเบียงส่วนตัว ภายในห้องโปร่งโล่งสบาย เหมาะสำหรับการผ่อนคลายหลังจากวันพักผ่อนริมชายหาด",
      images: [
        "/images/rooms/deluxe-pool-view/01.jpg",
        "/images/rooms/deluxe-pool-view/02.jpg",
        "/images/rooms/deluxe-pool-view/03.jpg",
        "/images/rooms/deluxe-pool-view/04.jpg"
      ]
    },
    {
      id: 3,
      name: "Deluxe Terrace",
      size: "50 ตร.ม.",
      guests: "ผู้ใหญ่ 2 ท่าน",
      bed: "เตียงคิง",
      view: "วิวสวน (ชั้นล่าง)",
      desc: "ตั้งอยู่ชั้นล่างพร้อมระเบียงกว้างขวางที่เชื่อมต่อสู่สวนสวยร่มรื่น ให้คุณใกล้ชิดธรรมชาติได้มากกว่าที่เคย เหมาะสำหรับผู้ที่ชื่นชอบการนั่งเล่นรับลมเย็นๆ",
      images: [
        "/images/rooms/deluxe-terrace/01.jpg",
        "/images/rooms/deluxe-terrace/02.jpg",
        "/images/rooms/deluxe-terrace/03.jpg",
        "/images/rooms/deluxe-terrace/04.jpg"
      ]
    },
    {
      id: 4,
      name: "Deluxe Pool Access",
      size: "50 ตร.ม.",
      guests: "ผู้ใหญ่ 2 ท่าน",
      bed: "เตียงคิง",
      view: "ติดสระว่ายน้ำ",
      desc: "ที่สุดแห่งประสบการณ์การพักผ่อน ก้าวลงสระว่ายน้ำได้ทันทีจากระเบียงส่วนตัวของคุณ ห้องยอดนิยมสำหรับคู่รักและผู้ที่รักการว่ายน้ำเป็นชีวิตจิตใจ",
      images: [
        "/images/rooms/deluxe-pool-access/01.jpg",
        "/images/rooms/deluxe-pool-access/02.jpg",
        "/images/rooms/deluxe-pool-access/03.jpg",
        "/images/rooms/deluxe-pool-access/04.jpg"
      ]
    },
    {
      id: 5,
      name: "Jacuzzi Deluxe",
      size: "55 ตร.ม.",
      guests: "ผู้ใหญ่ 2 ท่าน",
      bed: "เตียงคิง",
      view: "จากุซซี่ส่วนตัว",
      desc: "ดื่มด่ำความหรูหรากับอ่างจากุซซี่ส่วนตัวริมระเบียง สร้างช่วงเวลาสุดโรแมนติกในบรรยากาศที่เป็นส่วนตัวและเงียบสงบ ให้วันพักผ่อนของคุณพิเศษกว่าใคร",
      images: [
        "/images/rooms/jacuzzi-deluxe/01.jpg",
        "/images/rooms/jacuzzi-deluxe/02.jpg",
        "/images/rooms/jacuzzi-deluxe/03.jpg",
        "/images/rooms/jacuzzi-deluxe/04.jpg"
      ]
    },
    {
      id: 6,
      name: "Family Deluxe",
      size: "60 ตร.ม.",
      guests: "ผู้ใหญ่ 2 + เด็ก 2",
      bed: "เตียงคิง + เตียงสองชั้น",
      view: "วิวสวน / สระ",
      desc: "ออกแบบมาเพื่อครอบครัวโดยเฉพาะ พร้อมเตียงคิงไซส์สำหรับคุณพ่อคุณแม่และเตียงสองชั้นแสนสนุกสำหรับคุณหนูๆ พื้นที่กว้างขวางและสะดวกสบายสำหรับทุกคน",
      images: [
        "/images/rooms/family-deluxe/01.jpg",
        "/images/rooms/family-deluxe/02.jpg",
        "/images/rooms/family-deluxe/03.jpg",
        "/images/rooms/family-deluxe/04.jpg"
      ]
    }
  ];

  // AI-READY: Structured Data - นำราคาออกให้สอดคล้องกัน
  const roomSchemaTH = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket (ดิ โอลด์ ภูเก็ต)",
    "containsPlace": rooms.map(room => ({
      "@type": "HotelRoom",
      "name": room.name,
      "description": room.desc,
      "image": `https://theoldphuket.vercel.app${room.images[0]}`,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": parseInt(room.size.replace(' ตร.ม.', '')),
        "unitCode": "MTK"
      },
      "occupancy": {
        "@type": "QuantitativeValue",
        "value": room.guests.includes("เด็ก") ? 4 : 2,
        "unitText": room.guests
      },
      "bed": room.bed
    }))
  };

  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    return (
      <div className="relative h-64 md:h-80 overflow-hidden rounded-sm group">
        <img src={images[currentIndex]} alt="Room" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        <button onClick={(e) => { e.preventDefault(); prevSlide(); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => { e.preventDefault(); nextSlide(); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen">
      <Head>
        <title>ห้องพักและห้องสวีท - The Old Phuket | AI Ready Hotel</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchemaTH) }} />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img src="/images/rooms/deluxe-pool-access/01.jpg" alt="Accommodation Hero" className="w-full h-full object-cover opacity-60"/>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">พื้นที่ส่วนตัวของคุณ</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">ห้องพักและห้องสวีท</h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- ROOM LIST --- */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid gap-16">
          {rooms.map((room, index) => (
            <div key={room.id} className="bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300">
              
              <div className="md:w-1/2">
                <ImageSlider images={room.images} />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                 <div className="absolute top-6 right-6 text-gray-100 text-6xl font-serif font-bold select-none">
                   {String(index + 1).padStart(2, '0')}
                 </div>

                 <h3 className="text-3xl font-serif font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">{room.name}</h3>
                 
                 <p className="text-gray-500 font-light mb-8 leading-relaxed italic">{room.desc}</p>

                 {/* Icons Grid */}
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-b border-gray-100 py-6">
                   <div className="flex items-center text-gray-600 text-sm"><Maximize size={18} className="mr-3 text-[#E5C595]" /> {room.size}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Users size={18} className="mr-3 text-[#E5C595]" /> {room.guests}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Bed size={18} className="mr-3 text-[#E5C595]" /> {room.bed}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Sun size={18} className="mr-3 text-[#E5C595]" /> {room.view}</div>
                 </div>

                 <div className="flex">
                   <button className="bg-gray-900 text-white px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E5C595] transition-colors flex-1 shadow-md">
                     ตรวจสอบสถานะห้องว่าง
                   </button>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}