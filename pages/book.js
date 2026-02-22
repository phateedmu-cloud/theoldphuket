import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Calendar, User, Phone, Mail, Home, CreditCard, ChevronLeft } from 'lucide-react';

export default function BookingDetails() {
  const router = useRouter();
  const { roomTypeId, checkIn, checkOut, adults, children } = router.query;
  
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // คำนวณจำนวนคืน (Stay Duration)
  const stayNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalNights = stayNights();

  useEffect(() => {
    if (router.isReady && roomTypeId) {
      // ดึงข้อมูลจาก API search-rooms ที่เรามีอยู่แล้ว
      fetch(`/api/search-rooms?checkIn=${checkIn}&checkOut=${checkOut}`)
        .then(res => res.json())
        .then(result => {
          // แก้ไขจุดที่เกิด Error: เช็คว่า result และ result.data มีค่าจริงก่อนใช้ .find()
          if (result && result.data) {
            const selected = result.data.find(r => r.id === roomTypeId);
            setRoomData(selected);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [router.isReady, roomTypeId, checkIn, checkOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // จำลองการส่งข้อมูล (ในอนาคตจะเชื่อมกับ ChillPay และ DB)
    setBookingSuccess(true);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-serif italic text-gray-400">
      Preparing your booking summary...
    </div>
  );

  // คำนวณราคาสุทธิ
  const roomPrice = Number(roomData?.price || 0);
  const subTotal = roomPrice * totalNights;
  const taxAndService = subTotal * 0.177; // 7% VAT + 10% Service Charge ตามมาตรฐานโรงแรม
  const grandTotal = subTotal + taxAndService;

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-12 bg-white shadow-2xl rounded-sm max-w-md border-t-8 border-[#E5C595]">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-3xl font-serif font-bold mb-4 uppercase">Booking Confirmed</h1>
          <p className="text-gray-500 mb-8 text-sm tracking-widest font-light">
            Thank you, your reservation at The Old Phuket has been received.
          </p>
          <button onClick={() => router.push('/')} className="w-full bg-gray-900 text-white py-4 font-bold tracking-[0.3em] text-[10px] uppercase shadow-lg">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28 font-sans">
      <Head><title>Confirm Your Stay - The Old Phuket</title></Head>
      
      <div className="max-w-6xl mx-auto px-4">
        {/* ปุ่มย้อนกลับ */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-widest font-bold">
          <ChevronLeft size={14} /> Back to Selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ส่วนกรอกข้อมูล (Left) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-serif font-bold mb-10 uppercase tracking-tight flex items-center gap-4 text-gray-800">
                <User size={24} className="text-[#E5C595]" /> Guest Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm uppercase tracking-widest" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Phone Number</label>
                    <input type="tel" placeholder="+66" className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm" required />
                  </div>
                </div>

                <div className="pt-10">
                  <button className="w-full bg-gray-900 text-white py-6 font-bold tracking-[0.4em] text-[10px] uppercase hover:bg-[#c5a97d] transition-all shadow-2xl flex items-center justify-center gap-3">
                    Finalize Booking <span className="text-xs">→</span>
                  </button>
                  <p className="text-center text-[9px] text-gray-300 mt-6 uppercase tracking-[0.2em]">
                    By clicking, you agree to our terms and conditions.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* สรุปยอดเงิน (Right) */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-2xl sticky top-28 border-t-8 border-[#E5C595] overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="font-serif font-bold text-xl mb-6 text-gray-800 uppercase tracking-tight">{roomData?.name || "Room Selection"}</h3>
                <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  <div className="flex items-center gap-4"><Calendar size={14} className="text-[#E5C595]" /> {checkIn} — {checkOut}</div>
                  <div className="flex items-center gap-4"><Home size={14} className="text-[#E5C595]" /> {totalNights} Night(s) Stay</div>
                  <div className="flex items-center gap-4"><User size={14} className="text-[#E5C595]" /> {adults} Adults, {children} Children</div>
                </div>
              </div>

              <div className="p-8 space-y-5 bg-gray-50/30">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-gray-400">Average Per Night</span>
                  <span className="font-bold text-gray-700">THB {roomPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold text-gray-700">THB {subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-gray-400">Taxes & Fees (17.7%)</span>
                  <span className="font-bold text-gray-700">THB {taxAndService.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Total Price</span>
                  <div className="text-right">
                    <p className="text-3xl font-serif font-bold text-gray-900 leading-none">THB {grandTotal.toLocaleString()}</p>
                    <p className="text-[8px] text-gray-400 mt-2 uppercase">Includes VAT and Service Charge</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-5 flex items-center justify-center gap-3">
                 <CreditCard size={16} className="text-[#E5C595]" />
                 <span className="text-[9px] text-white uppercase tracking-widest font-bold">Payment integration coming soon</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}