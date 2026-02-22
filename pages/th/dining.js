import React from 'react';
import Head from 'next/head';
import { Clock, MapPin, Coffee, Utensils, Wine } from 'lucide-react';

export default function DiningTH() {
  const themeColor = '#E5C595';

  const restaurants = [
    {
      id: 1,
      name: "Shark Restaurant",
      type: "บุฟเฟต์อาหารเช้า",
      desc: "เริ่มต้นวันใหม่ด้วยความสดใสกับบุฟเฟต์อาหารเช้านานาชาติ ที่คัดสรรวัตถุดิบคุณภาพเยี่ยมมาปรุงสดใหม่ทุกวัน ท่ามกลางบรรยากาศโล่งโปร่งสบาย",
      open: "06:30 - 10:30 น.",
      image: "/images/dining/03.jpg", 
      icon: <Coffee size={24} />
    },
    {
      id: 2,
      name: "Pasha Restaurant",
      type: "อาหารไทยและนานาชาติ",
      desc: "ลิ้มลองรสชาติอาหารไทยแท้และอาหารตะวันตกยอดนิยม ปรุงรสอย่างพิถีพิถันโดยเชฟมืออาชีพ บรรยากาศอบอุ่นเหมาะสำหรับมื้อกลางวันและมื้อค่ำ",
      open: "11:00 - 23:00 น.",
      image: "/images/dining/04.jpg", 
      icon: <Utensils size={24} />
    },
    {
      id: 3,
      name: "Serene Pool Bar",
      type: "เครื่องดื่มและของว่างริมสระ",
      desc: "ผ่อนคลายริมสระว่ายน้ำฝั่ง Serene Wing พร้อมเครื่องดื่มค็อกเทลแก้วโปรด น้ำผลไม้สดปั่น และของว่างทานเล่น ให้วันพักผ่อนของคุณสดชื่นยิ่งขึ้น",
      open: "10:00 - 21:00 น.",
      image: "/images/dining/01.jpg", 
      icon: <Wine size={24} />
    },
    {
      id: 4,
      name: "KO-I Bar",
      type: "เลานจ์และบาร์ (Sino Wing)",
      desc: "จุดนัดพบสุดคลาสสิกบนชั้น 3 ของตึก Sino Wing จิบกาแฟยามบ่ายหรือเครื่องดื่มเย็นๆ พร้อมชมวิวทิวทัศน์ในบรรยากาศที่เป็นส่วนตัว",
      open: "10:00 - 19:00 น.",
      image: "/images/dining/02.jpg", 
      icon: <Wine size={24} />
    }
  ];

  // --- AI-READY: Structured Data (Schema.org) ภาษาไทย ---
  const diningSchemaTH = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket (ดิ โอลด์ ภูเก็ต)",
    "containsPlace": restaurants.map(place => ({
      "@type": "Restaurant",
      "name": place.name,
      "description": place.desc,
      "image": `https://theoldphuket.vercel.app${place.image}`,
      "servesCuisine": place.type.includes("ไทย") ? "Thai, International" : "International",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": place.open.split(' - ')[0].trim(),
        "closes": place.open.split(' - ')[1].replace(' น.', '').trim()
      }
    }))
  };

  return (
    <div className="font-sans text-gray-800">
      <Head>
        <title>อาหารและเครื่องดื่ม - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="อิ่มอร่อยกับอาหารรสเลิศที่ The Old Phuket ทั้งบุฟเฟต์อาหารเช้าที่ Shark Restaurant และอาหารไทยต้นตำรับที่ Pasha Restaurant" />
        
        {/* ✅ ฝังโค้ด AI Schema ร้านอาหาร (ภาษาไทย) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(diningSchemaTH) }}
        />
      </Head>

      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        {/* ใช้รูปอาหารสวยๆ เป็นปก */}
        <img src="/images/dining/04.jpg" className="w-full h-full object-cover opacity-60" alt="Dining" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="tracking-[0.3em] uppercase text-sm mb-4">Taste of Phuket</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">อาหารและเครื่องดื่ม</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">สุนทรียภาพแห่งรสชาติ</h2>
          <p className="text-gray-500 leading-relaxed font-light">
            สัมผัสประสบการณ์การรับประทานอาหารที่หลากหลายที่ <strong>The Old Phuket</strong> ตั้งแต่บุฟเฟต์อาหารเช้าสุดอลังการ 
            ไปจนถึงดินเนอร์อาหารไทยและนานาชาติรสเลิศ เราพร้อมมอบความสุขผ่านรสชาติอาหารที่ปรุงด้วยใจและการบริการที่อบอุ่นเป็นกันเอง
          </p>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="pb-24 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {restaurants.map((place) => (
            <div key={place.id} className="bg-white rounded-sm shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="h-[300px] overflow-hidden relative">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-[#E5C595]">
                  {place.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-2 text-gray-800">{place.name}</h3>
                <p className="text-[#E5C595] text-sm font-bold uppercase tracking-wider mb-4">{place.type}</p>
                <p className="text-gray-500 font-light mb-6 leading-relaxed min-h-[80px]">
                  {place.desc}
                </p>
                <div className="flex items-center text-gray-400 text-sm border-t border-gray-100 pt-4">
                  <Clock size={16} className="mr-2" /> เปิดบริการ: {place.open}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}