import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Plus, Minus, Calendar, Users, Search } from 'lucide-react';

export default function SearchPage() {
  const router = useRouter();
  
  // สถานะวันที่และจำนวนผู้เข้าพัก
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [counters, setCounters] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });

  // ✅ ดึงค่าเริ่มต้นจาก URL (ถ้ามี) มาใส่ในกล่องอัตโนมัติ
  useEffect(() => {
    if (router.isReady) {
      const { checkIn: urlCheckIn, checkOut: urlCheckOut, adults: urlAdults, children: urlChildren, rooms: urlRooms } = router.query;
      
      if (urlCheckIn) setCheckIn(urlCheckIn);
      if (urlCheckOut) setCheckOut(urlCheckOut);
      
      // อัปเดต State ถ้ามีการส่งค่าจำนวนคนหรือห้องมา
      setCounters(prev => ({
        rooms: urlRooms ? parseInt(urlRooms, 10) : prev.rooms,
        adults: urlAdults ? parseInt(urlAdults, 10) : prev.adults,
        children: urlChildren ? parseInt(urlChildren, 10) : prev.children
      }));
    }
  }, [router.isReady, router.query]);

  const updateCounter = (key, type) => {
    setCounters(prev => ({
      ...prev,
      [key]: type === 'plus' ? prev[key] + 1 : Math.max((key === 'children' ? 0 : 1), prev[key] - 1)
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // ✅ เปลี่ยนจาก '/rooms-selection' เป็นชื่อไฟล์จริงที่คุณทำไว้ (เช่น '/rooms')
    // สำคัญ: ต้องให้ชื่อนี้ตรงกับหน้าที่มี AI คำนวณราคา 10% ครับ
    router.push({
      pathname: '/rooms-selection', 
      query: { 
        checkIn, 
        checkOut, 
        ...counters 
      },
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Head>
        <title>Search Rooms - The Old Phuket</title>
      </Head>

      {/* Hero Section สำหรับหน้า Search */}
      <div className="relative h-[40vh] bg-gray-900 flex items-center justify-center">
        <img src="/images/hero-search.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hero" />
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-widest uppercase mb-2">Book Your Stay</h1>
          <p className="text-[#E5C595] text-xs tracking-[0.4em] uppercase">The Old Phuket Karon Beach</p>
        </div>
      </div>

      {/* Search Bar / Panel */}
      <div className="max-w-5xl mx-auto -mt-16 relative z-10 px-4">
        <form onSubmit={handleSearch} className="bg-white shadow-2xl rounded-sm p-8 md:p-12 border-t-4 border-[#E5C595]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* ส่วนวันที่ */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Calendar size={14} className="mr-2 text-[#E5C595]" /> Check-In
                </label>
                <input 
                  type="date" 
                  value={checkIn} // ✅ ผูกค่ากับ State
                  className="w-full border-b border-gray-200 py-3 focus:border-[#E5C595] outline-none transition-all text-gray-700"
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Calendar size={14} className="mr-2 text-[#E5C595]" /> Check-Out
                </label>
                <input 
                  type="date" 
                  value={checkOut} // ✅ ผูกค่ากับ State
                  className="w-full border-b border-gray-200 py-3 focus:border-[#E5C595] outline-none transition-all text-gray-700"
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            {/* ส่วนจำนวนคน (แบบย่อก่อนกด) */}
            <div className="space-y-3">
              <label className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Users size={14} className="mr-2 text-[#E5C595]" /> Guests & Rooms
              </label>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-sm font-light">{counters.rooms} Room, {counters.adults + counters.children} Guests</span>
              </div>
            </div>

          </div>

          {/* ปุ่มปรับจำนวนผู้เข้าพัก (Counter Section) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-10 border-t border-gray-50">
            {[
              { label: 'Rooms', key: 'rooms' },
              { label: 'Adults', key: 'adults' },
              { label: 'Children', key: 'children' }
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center bg-gray-50 p-4 rounded-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{item.label}</span>
                <div className="flex items-center space-x-4">
                  <button type="button" onClick={() => updateCounter(item.key, 'minus')} className="text-gray-400 hover:text-black transition-colors"><Minus size={16} /></button>
                  <span className="font-serif text-lg">{counters[item.key]}</span>
                  <button type="button" onClick={() => updateCounter(item.key, 'plus')} className="text-gray-400 hover:text-black transition-colors"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button className="w-full bg-gray-900 text-white py-5 font-bold tracking-[0.4em] hover:bg-[#c5a97d] transition-all flex items-center justify-center gap-3 shadow-xl">
              <Search size={18} /> CHECK AVAILABILITY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}