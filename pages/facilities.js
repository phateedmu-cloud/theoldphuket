import React from 'react';
import Head from 'next/head';
import { Wifi, Clock, Users, Star, Coffee, Dumbbell, Baby, MapPin, CheckCircle } from 'lucide-react';

export default function Facilities() {
  const themeColor = '#E5C595';

  // 🚩 ข้อมูล Facilities (English)
  const highlights = [
    {
      id: 1,
      name: "Fitness Center",
      desc: "Stay fit during your vacation with our fully equipped gym. Featuring modern cardio machines and free weights.",
      image: "/images/facilities/fitness-01.jpg", 
      icon: <Dumbbell size={24} />
    },
    {
      id: 2,
      name: "Kids Club & Game Room",
      desc: "A fun paradise for your little ones. Safe and colorful environment with plenty of toys and activities.",
      image: "/images/facilities/kidclub.jpg", 
      icon: <Baby size={24} />
    },
    {
      id: 3,
      name: "Swimming Pools",
      desc: "Relax in our crystal clear salt-water swimming pool with a dedicated child pool for family fun.",
      image: "/images/facilities/General-Facilities.jpg",
      icon: <Users size={24} />
    }
  ];

  // 🚩 รายการ Services (English)
  const generalServices = [
    "Laundry & Dry Cleaning", "Room Service", "Baby Sitting", 
    "Doctor on Call", "Tour Desk & Information", "Luggage Porter Service",
    "Wedding Ceremony", "Library & Internet Corner", "Ample Parking Area"
  ];

  // 🚩 ข้อมูลห้องประชุม (English Units)
  const meetingRooms = [
    { name: "Sino A", area: "235 sq.m", height: "3.5 m", pax: "120-200" },
    { name: "Sino B", area: "110 sq.m", height: "3.5 m", pax: "60-70" }
  ];

  // --- AI-READY: Structured Data (Schema.org) English ---
  const facilitySchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
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
        "name": "Meeting & Conference Rooms",
        "value": true
      }
    ]
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen">
      <Head>
        <title>Facilities - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="Enjoy our comprehensive facilities including salt-water swimming pools, fitness center, kids club, and meeting rooms at The Old Phuket, Karon Beach." />
        
        {/* ✅ ฝังโค้ด AI Schema ภาษาอังกฤษ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitySchema) }}
        />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/images/facilities/fitness-01.jpg" 
            alt="Facilities Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Relax & Enjoy</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
            OUR FACILITIES
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- INTRO --- */}
      <div className="py-20 text-center bg-white px-4">
        <div className="container mx-auto max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800">
             Everything You Need for a Perfect Stay
           </h2>
           <p className="text-gray-500 text-lg font-light leading-relaxed">
             Experience our wide range of premium facilities designed to cater to your every need. 
             From our state-of-the-art fitness center and vibrant kids' club to our professional services, 
             we ensure your holiday is nothing short of perfection.
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
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: themeColor }}>General Services</h2>
            <p className="text-gray-400 font-light">
              Our dedicated team provides comprehensive services around the clock to ensure your comfort and convenience.
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
            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-800">Meeting & Events</h2>
            <p className="text-gray-500 font-light">
              Versatile venues for meetings, seminars, and banquets, fully equipped with modern facilities.
            </p>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <th className="p-4 font-bold border-b">Room Name</th>
                  <th className="p-4 font-bold border-b">Area (sq.m)</th>
                  <th className="p-4 font-bold border-b">Height (m)</th>
                  <th className="p-4 font-bold border-b">Capacity (Pax)</th>
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