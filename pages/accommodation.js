import React, { useState } from 'react';
import Head from 'next/head';
import { ChevronRight, ChevronLeft, Users, Maximize, Bed, Sun } from 'lucide-react';

export default function Accommodation() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      size: "42 SQ.M",
      guests: "2 Adults",
      bed: "King / Twin",
      view: "Garden / City",
      desc: "Experience the charm of Sino-Portuguese architecture blended with modern comfort. This spacious room features a private balcony and all essential amenities for a relaxing stay.",
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
      size: "45 SQ.M",
      guests: "2 Adults",
      bed: "King / Twin",
      view: "Swimming Pool",
      desc: "Enjoy stunning views of our sparkling swimming pool from your private balcony. The room offers a bright and airy atmosphere, perfect for unwinding after a day at the beach.",
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
      size: "50 SQ.M",
      guests: "2 Adults",
      bed: "King",
      view: "Garden Terrace",
      desc: "Located on the ground floor, this room features a spacious private terrace with direct access to the lush garden. Ideal for those who love outdoor relaxation.",
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
      size: "50 SQ.M",
      guests: "2 Adults",
      bed: "King",
      view: "Pool Access",
      desc: "The ultimate resort experience. Step directly from your private terrace into the refreshing swimming pool. Perfect for couples and water lovers.",
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
      size: "55 SQ.M",
      guests: "2 Adults",
      bed: "King",
      view: "Private Jacuzzi",
      desc: "Indulge in luxury with your very own private jacuzzi on the balcony. Create romantic memories in a secluded and serene atmosphere.",
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
      size: "60 SQ.M",
      guests: "2 Adults + 2 Kids",
      bed: "King + Bunk Beds",
      view: "Garden / Pool",
      desc: "Designed with families in mind, this room features a king-sized bed for parents and fun bunk beds for the kids. Spacious and comfortable for everyone.",
      images: [
        "/images/rooms/family-deluxe/01.jpg",
        "/images/rooms/family-deluxe/02.jpg",
        "/images/rooms/family-deluxe/03.jpg",
        "/images/rooms/family-deluxe/04.jpg"
      ]
    }
  ];

  // AI-READY: Structured Data (ลบส่วน Price ออกเพื่อให้สอดคล้องกับหน้าเว็บ)
  const roomSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
    "containsPlace": rooms.map(room => ({
      "@type": "HotelRoom",
      "name": room.name,
      "description": room.desc,
      "image": `https://theoldphuket.vercel.app${room.images[0]}`,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": parseInt(room.size),
        "unitCode": "MTK"
      },
      "occupancy": {
        "@type": "QuantitativeValue",
        "value": room.guests.includes("Kids") ? 4 : 2,
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
        <title>Accommodation - The Old Phuket | AI Ready Hotel</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      </Head>

      {/* HERO HEADER */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img src="/images/rooms/deluxe-pool-access/01.jpg" alt="Accommodation Hero" className="w-full h-full object-cover opacity-60"/>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Your Sanctuary</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg uppercase">Rooms & Suites</h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* ROOM LIST */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid gap-16">
          {rooms.map((room, index) => (
            <div key={room.id} className="bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
              
              {/* Left: Image Slider */}
              <div className="md:w-1/2">
                <ImageSlider images={room.images} />
              </div>

              {/* Right: Details */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                 <div className="absolute top-6 right-6 text-gray-100 text-6xl font-serif font-bold select-none">
                   {String(index + 1).padStart(2, '0')}
                 </div>

                 <h3 className="text-3xl font-serif font-bold text-gray-800 mb-6 uppercase tracking-tight">{room.name}</h3>
                 
                 <p className="text-gray-500 font-light mb-8 leading-relaxed italic border-l-2 border-[#E5C595] pl-4">{room.desc}</p>

                 {/* Icons Grid */}
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-b border-gray-100 py-6">
                   <div className="flex items-center text-gray-600 text-sm"><Maximize size={18} className="mr-3 text-[#E5C595]" /> {room.size}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Users size={18} className="mr-3 text-[#E5C595]" /> {room.guests}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Bed size={18} className="mr-3 text-[#E5C595]" /> {room.bed}</div>
                   <div className="flex items-center text-gray-600 text-sm"><Sun size={18} className="mr-3 text-[#E5C595]" /> {room.view}</div>
                 </div>

                 <div className="flex">
                   <button className="bg-gray-900 text-white px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#E5C595] transition-colors flex-1 shadow-lg">
                     Request Availability
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