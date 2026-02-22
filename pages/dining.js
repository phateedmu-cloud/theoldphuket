import React from 'react';
import Head from 'next/head';
import { Coffee, Wine, Utensils, Clock, MapPin } from 'lucide-react';

// ✅ 1. Import สมองส่วนกลางและคลังคำแปล
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Dining() {
  const themeColor = '#E5C595';

  // ✅ 2. เรียกใช้งานระบบแปลภาษา
  const { lang } = useLanguage();
  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN']?.[key] || fallbackText || key;
  };

  // ✅ 3. เปลี่ยน Data ให้ไปดึงคำแปลด้วยคีย์ที่เตรียมไว้
  const outlets = [
    {
      id: 1,
      nameKey: "dine_shark_name", fallbackName: "Shark Restaurant",
      conceptKey: "dine_shark_concept", fallbackConcept: "Daily Buffet Breakfast",
      descKey: "dine_shark_desc", fallbackDesc: "Start your day with a wide variety of delicious breakfast options. Enjoy our daily buffet featuring fresh local ingredients, international favorites, and a live cooking station.",
      open: "06:30 - 10:30 hrs",
      image: "/images/dining/03.jpg", 
      icon: <Coffee size={24} />
    },
    {
      id: 2,
      nameKey: "dine_pasha_name", fallbackName: "Pasha Restaurant",
      conceptKey: "dine_pasha_concept", fallbackConcept: "Thai & International Cuisine",
      descKey: "dine_pasha_desc", fallbackDesc: "Savor the authentic taste of Thai cuisine and popular international dishes. Whether for lunch or dinner, our chefs prepare every dish with passion and the finest ingredients.",
      open: "11:00 - 23:00 hrs",
      image: "/images/dining/04.jpg", 
      icon: <Utensils size={24} />
    },
    {
      id: 3,
      nameKey: "dine_serene_name", fallbackName: "Serene Pool Bar",
      conceptKey: "dine_serene_concept", fallbackConcept: "Poolside Snacks & Drinks",
      descKey: "dine_serene_desc", fallbackDesc: "Located at the Serene Wing, relax by the pool with refreshing cocktails, smoothies, and a variety of snacks. The perfect spot to unwind under the sun.",
      open: "10:00 - 21:00 hrs",
      image: "/images/dining/01.jpg", 
      icon: <Wine size={24} />
    },
    {
      id: 4,
      nameKey: "dine_koi_name", fallbackName: "KO-I Bar",
      conceptKey: "dine_koi_concept", fallbackConcept: "Sino Wing Lounge",
      descKey: "dine_koi_desc", fallbackDesc: "Located on the 3rd floor of the Sino Wing. Enjoy a selection of snacks, food, and drinks in a classic atmosphere with a view.",
      open: "10:00 - 19:00 hrs",
      image: "/images/dining/02.jpg", 
      icon: <Wine size={24} />
    },
    {
      id: 5,
      nameKey: "dine_room_name", fallbackName: "Room Service",
      conceptKey: "dine_room_concept", fallbackConcept: "Private Dining",
      descKey: "dine_room_desc", fallbackDesc: "Enjoy Thai and International dishes delivered straight to your room. Perfect for a lazy morning or a private dinner on your balcony.",
      open: "11:00 - 22:00 hrs",
      image: "/images/dining/05.jpg", 
      icon: <Clock size={24} />
    }
  ];

  const diningSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "The Old Phuket",
    "containsPlace": outlets.map(outlet => ({
      "@type": "Restaurant",
      "name": outlet.fallbackName, // SEO ให้มองเห็นภาษาอังกฤษเป็นหลัก
      "description": outlet.fallbackDesc,
      "image": `https://theoldphuket.vercel.app${outlet.image}`,
      "servesCuisine": outlet.fallbackConcept.includes("Thai") ? "Thai, International" : "International",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(diningSchema) }} />
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
        <div className="relative z-10 text-center text-white px-4 pt-16">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-[#E5C595]">
            {t('dine_hero_subtitle', 'Taste & Savor')}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg uppercase">
            {t('dine_hero_title', 'DINING')}
          </h1>
          <div className="w-24 h-1 mx-auto bg-[#E5C595]"></div>
        </div>
      </div>

      {/* --- INTRO --- */}
      <div className="py-20 text-center bg-white px-4">
        <div className="container mx-auto max-w-3xl">
           <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800">
             {t('dine_intro_title', 'Culinary Delights in Karon')}
           </h2>
           <p className="text-gray-500 text-lg font-light leading-relaxed">
             {t('dine_intro_desc', 'Indulge in a culinary journey at The Old Phuket. From a hearty breakfast at Shark Restaurant to exquisite Thai & International dinners at Pasha, we offer dining experiences to satisfy every craving.')}
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
                    alt={t(outlet.nameKey, outlet.fallbackName)} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className={`absolute -bottom-4 -right-4 w-full h-full border-2 border-[#E5C595] -z-10 rounded-sm hidden md:block ${index % 2 !== 0 ? '-left-4' : ''}`}></div>
              </div>

              {/* Text Section */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start text-[#E5C595] mb-4">
                  {outlet.icon}
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest">
                    {t(outlet.conceptKey, outlet.fallbackConcept)}
                  </span>
                </div>
                
                <h3 className="text-4xl font-serif font-bold mb-6 text-gray-800 uppercase tracking-tight">
                  {t(outlet.nameKey, outlet.fallbackName)}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 text-lg">
                  {t(outlet.descKey, outlet.fallbackDesc)}
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