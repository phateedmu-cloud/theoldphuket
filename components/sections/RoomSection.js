/*******************************************************************************
 * ไฟล์: components/sections/RoomSection.js (AI-Generated from Scraped Data)
 ******************************************************************************/

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RoomSection() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจากไฟล์ที่ OpenClawn ไปล่ามา
    try {
      const data = require('../../rooms_data.json');
      setRooms(data.rooms || []);
    } catch (e) {
      console.error("ยังไม่พบไฟล์ข้อมูลห้องพักค่ะ");
    }
  }, []);

  if (rooms.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header ส่วนห้องพัก */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-5xl">
            Our Accommodations
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-yellow-600"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            สัมผัสประสบการณ์การพักผ่อนเหนือระดับกับห้องพักที่ถูกออกแบบอย่างพิถีพิถัน 
            เพื่อความสะดวกสบายสูงสุดของคุณ
          </p>
        </div>

        {/* รายรายการห้องพัก (Room Cards) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <div 
              key={index} 
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* รูปภาพห้องพัก */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={room.image && room.image.startsWith('http') ? room.image : "/images/hero/main02.jpg"} 
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-1 text-sm font-bold text-yellow-700 shadow-md">
                  {room.price || "Best Rate"}
                </div>
              </div>

              {/* รายละเอียดห้องพัก */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-gray-900">{room.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {room.description}
                </p>
                
                <button className="mt-6 w-full rounded-lg border-2 border-yellow-600 py-2.5 text-sm font-bold text-yellow-700 transition hover:bg-yellow-600 hover:text-white">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}