import React from 'react';
import Head from 'next/head';
import { Coffee, Wine, Utensils, Clock, MapPin } from 'lucide-react';

export default function Dining() {
  const themeColor = '#E5C595';

  const outlets = [
    {
      id: 1,
      name: "Shark Restaurant",
      concept: "Daily Buffet Breakfast",
      desc: "Start your day with a wide variety of delicious breakfast options. Enjoy our daily buffet featuring fresh local ingredients, international favorites, and a live cooking station.",
      open: "06:30 - 10:30 hrs",
      image: "/images/dining/03.jpg", // รูปไลน์อาหารเช้า/เรือ
      icon: <Coffee size={24} />
    },
    {
      id: 2,
      name: "Pasha Restaurant",
      concept: "Thai & International Cuisine",
      desc: "Savor the authentic taste of Thai cuisine and popular international dishes. Whether for lunch or dinner, our chefs prepare every dish with passion and the finest ingredients.",
      open: "11:00 - 23:00 hrs",
      image: "/images/dining/04.jpg", // รูปโต๊ะอาหารจัดเต็ม
      icon: <Utensils size={24} />
    },
    {
      id: 3,
      name: "Serene Pool Bar",
      concept: "Poolside Snacks & Drinks",
      desc: "Located at the Serene Wing, relax by the pool with refreshing cocktails, smoothies, and a variety of snacks. The perfect spot to unwind under the sun.",
      open: "10:00 - 21:00 hrs",
      image: "/images/dining/01.jpg", // รูปริมสระ
      icon: <Wine size={24} />
    },
    {
      id: 4,
      name: "KO-I Bar",
      concept: "Sino Wing Lounge",
      desc: "Located on the 3rd floor of the Sino Wing. Enjoy a selection of snacks, food, and drinks in a classic atmosphere with a view.",
      open: "10:00 - 19:00 hrs",
      image: "/images/dining/02.jpg", // รูปติ่มซำ/ของว่าง
      icon: <Wine size={24} />
    },
    {
      id: 5,
      name: "Room Service",
      concept: "Private Dining",
      desc: "Enjoy Thai and International dishes delivered straight to your room. Perfect for a lazy morning or a private dinner on your balcony.",
      open: "11:00 - 22:00 hrs",
      image: "/images/dining/05.jpg", // รูปอาหารชุด
      icon: <Clock size={24} />
    }
  ];

  // --- AI-READY: Structured Data for Restaurants ---
  const diningSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
    "containsPlace": outlets.map(outlet => ({
      "@type": "Restaurant",
      "name": outlet.name,
      "description": outlet.desc,
      "image": `https://theoldphuket.vercel.app${outlet.image}`,
      "servesCuisine": outlet.concept.includes("Thai") ? "Thai, International" : "International",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": outlet.open.split(' - ')[0].trim(),
        "closes": outlet.open.split(' - ')[1].replace(' hrs', '').trim()
      }
    }))
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-white min-h-screen">
      <Head>
        <title>Dining - The Old Phuket | AI Ready Hotel</title>
        <meta name="description" content="Experience culinary delights at The Old Phuket. From Shark Restaurant's breakfast buffet to Pasha's authentic Thai cuisine, enjoy delicious dining on Karon Beach." />
        
        {/* ✅ ฝังโค้ด AI Schema ร้านอาหาร */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(diningSchema) }}
        />
      </Head>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/images/dining/04.jpg" 
            alt="Dining Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">Taste & Savor</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
            DINING
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- INTRO --- */}
      <div className="py-20 text-center bg-white px-4">
        <div className="container mx-auto max-w-3xl">
           <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800">
             Culinary Delights in Karon
           </h2>
           <p className="text-gray-500 text-lg font-light leading-relaxed">
             Indulge in a culinary journey at The Old Phuket. From a hearty breakfast at Shark Restaurant 
             to exquisite Thai & International dinners at Pasha, we offer dining experiences to satisfy every craving.
           </p>
        </div>
      </div>

      {/* --- OUTLETS LIST --- */}
      <div className="container mx-auto px-6 pb-24">
        <div className="space-y-24">
          {outlets.map((outlet, index) => (
            <div key={outlet.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Image Section */}
              <div className="md:w-1/2 relative group">
                <div className="overflow-hidden rounded-sm shadow-xl">
                  <img 
                    src={outlet.image} 
                    alt={outlet.name} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                {/* กรอบตกแต่ง */}
                <div className={`absolute -bottom-4 -right-4 w-full h-full border-2 border-[#E5C595] -z-10 rounded-sm hidden md:block ${index % 2 !== 0 ? '-left-4' : ''}`}></div>
              </div>

              {/* Text Section */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start text-[#E5C595] mb-4">
                  {outlet.icon}
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest">{outlet.concept}</span>
                </div>
                
                <h3 className="text-4xl font-serif font-bold mb-6 text-gray-800">{outlet.name}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 text-lg">
                  {outlet.desc}
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start border-t border-gray-100 pt-6">
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2 text-[#E5C595]" />
                    <span className="text-sm font-medium">{outlet.open}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}