import React from 'react';
import Head from 'next/head';
import { Wifi, Clock, Users, Star, Coffee, Dumbbell, Baby, MapPin, CheckCircle } from 'lucide-react';

export default function FacilitiesTH() {
  const themeColor = '#E5C595';

  // 🚩 ข้อมูล Facilities (ภาษาไทย)
  const highlights = [
    {
      id: 1,
      name: "ฟิตเนส เซ็นเตอร์",
      desc: "ดูแลสุขภาพให้แข็งแรงอยู่เสมอด้วยห้องยิมที่มีอุปกรณ์ครบครัน ทั้งเครื่องคาร์ดิโอที่ทันสมัยและอุปกรณ์เวทเทรนนิ่ง",
      image: "/images/facilities/fitness-01.jpg", 
      icon: <Dumbbell size={24} />
    },
    {
      id: 2,
      name: "คิดส์คลับและห้องเกม",
      desc: "สวรรค์สำหรับคุณหนูๆ ในสภาพแวดล้อมที่ปลอดภัยและเต็มไปด้วยสีสัน พร้อมของเล่นและกิจกรรมสนุกๆ มากมาย",
      image: "/images/facilities/kidclub.jpg", 
      icon: <Baby size={24} />
    },
    {
      id: 3,
      name: "สระว่ายน้ำ",
      desc: "ผ่อนคลายในสระว่ายน้ำระบบเกลือที่ใสสะอาด พร้อมสระเด็กแยกสัดส่วนเพื่อความปลอดภัยและความสนุกสนานของครอบครัว",
      image: "/images/facilities/General-Facilities.jpg",
      icon: <Users size={24} />
    }
  ];

  // 🚩 รายการ Services (ภาษาไทย)
  const generalServices = [
    "บริการซักรีดและซักแห้ง", "รูมเซอร์วิส", "บริการพี่เลี้ยงเด็ก", 
    "บริการเรียกแพทย์ฉุกเฉิน", "เคาน์เตอร์ทัวร์และข้อมูลท่องเที่ยว", "บริการยกกระเป๋า",
    "จัดงานแต่งงาน", "ห้องสมุดและมุมอินเทอร์เน็ต", "ลานจอดรถกว้างขวาง"
  ];

  // 🚩 ข้อมูลห้องประชุม
  const meetingRooms = [
    { name: "Sino A", area: "235 ตร.ม.", height: "3.5 ม.", pax: "120-200" },
    { name: "Sino B", area: "110 ตร.ม.", height: "3.5 ม.", pax: "60-70" }
  ];

  // --- AI-READY: Structured Data (Schema.org) ภาษาไทย ---
  const facilitySchemaTH = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket (ดิ โอลด์ ภูเก็ต)",
    "amenityFeature": [
      ...highlights.map(item => ({
        "@type": "LocationFeatureSpecification",
        "name": item.name,
        "value": true,
        "image": `https://theoldphuket.vercel.app${item.image}`
      })),
      ...generalServices.map(service => ({
        "@type": "LocationFeatureSpecification",
        "name": service,
        "value": true
      })),
      {
        "@type": "LocationFeatureSpecification",
        "name": "ห้องประชุมสัมมนา",
        "value": true
      }
    ]
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen">
      <Head>
        <title>สิ่งอำนวยความสะดวก - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="เพลิดเพลินกับสิ่งอำนวยความสะดวกครบครันที่ The Old Phuket ทั้งสระว่ายน้ำระบบเกลือ ฟิตเนส คิดส์คลับ และห้องประชุมสัมมนา บนหาดกะรน" />
        
        {/* ✅ ฝังโค้ด AI Schema ภาษาไทย */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitySchemaTH) }}
        />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/facilities/fitness-01.jpg" 
            alt="Facilities Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Relax & Enjoy</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
            สิ่งอำนวยความสะดวก
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- INTRO --- */}
      <div className="py-20 text-center bg-white px-4">
        <div className="container mx-auto max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800">
             ครบครันทุกความต้องการเพื่อวันพักผ่อนที่สมบูรณ์แบบ
           </h2>
           <p className="text-gray-500 text-lg font-light leading-relaxed">
             สัมผัสประสบการณ์การพักผ่อนที่สะดวกสบายด้วยสิ่งอำนวยความสะดวกพรีเมียมที่เราคัดสรรมาเพื่อคุณ 
             ตั้งแต่ฟิตเนสเซ็นเตอร์ที่ทันสมัย คิดส์คลับที่สดใส ไปจนถึงบริการระดับมืออาชีพ 
             เพื่อให้วันหยุดของคุณสมบูรณ์แบบไร้ที่ติ
           </p>
        </div>
      </div>

      {/* --- HIGHLIGHTS --- */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-10">
          {highlights.map((item) => (
            <div key={item.id} className="bg-white shadow-xl group overflow-hidden rounded-sm hover:-translate-y-2 transition-transform duration-500">
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full text-[#E5C595] shadow-lg">
                  {item.icon}
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: themeColor }}>{item.name}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SERVICES LIST --- */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: themeColor }}>บริการทั่วไป</h2>
            <p className="text-gray-400 font-light">
              ทีมงานของเราพร้อมให้บริการดูแลอำนวยความสะดวกตลอด 24 ชั่วโมง
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generalServices.map((service, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 border border-gray-800 rounded hover:border-[#E5C595] transition-colors bg-gray-800/50">
                <CheckCircle size={20} className="text-[#E5C595] flex-shrink-0" />
                <span className="text-sm tracking-wide font-light">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MEETING ROOMS --- */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-800">การประชุมและจัดเลี้ยง</h2>
            <p className="text-gray-500 font-light">
              พื้นที่เอนกประสงค์สำหรับจัดประชุม สัมมนา และงานเลี้ยง พร้อมอุปกรณ์ครบครันทันสมัย
            </p>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <th className="p-4 font-bold border-b">ชื่อห้อง</th>
                  <th className="p-4 font-bold border-b">พื้นที่ (ตร.ม.)</th>
                  <th className="p-4 font-bold border-b">ความสูง (ม.)</th>
                  <th className="p-4 font-bold border-b">ความจุ (ท่าน)</th>
                </tr>
              </thead>
              <tbody>
                {meetingRooms.map((room, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                    <td className="p-4 font-bold font-serif text-lg" style={{ color: themeColor }}>{room.name}</td>
                    <td className="p-4 text-gray-600">{room.area}</td>
                    <td className="p-4 text-gray-600">{room.height}</td>
                    <td className="p-4 text-gray-600">{room.pax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}