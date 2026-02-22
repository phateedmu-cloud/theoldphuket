import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Calendar, Users, Phone, Mail, Home, CreditCard, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';

// ✅ 1. Import สมองส่วนกลางและคลังคำแปล
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function BookingDetails() {
  const router = useRouter();
  const { roomTypeId, checkIn, checkOut, adults, children, finalPrice } = router.query;
  
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // ✅ 2. เรียกใช้งานระบบแปลภาษา
  const { lang } = useLanguage();
  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return translations['EN']?.[key] || fallbackText || key;
  };

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
      fetch(`/api/search-rooms?checkIn=${checkIn}&checkOut=${checkOut}`)
        .then(res => res.json())
        .then(result => {
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

  const roomPrice = finalPrice ? Number(finalPrice) : Number(roomData?.price || 0);
  const grandTotal = roomPrice * totalNights;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          roomTypeId,
          roomName: roomData?.name,
          checkIn,
          checkOut,
          adults,
          children,
          totalPrice: grandTotal,
          status: 'PENDING'
        }),
      });

      if (response.ok) {
        setBookingSuccess(true);
      } else {
        alert(t('booking_error', "System error. Please try again or contact support."));
      }
    } catch (error) {
      console.error("Booking Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-serif italic text-gray-400 uppercase tracking-widest text-sm">
      {t('preparing_summary', 'Preparing your booking summary...')}
    </div>
  );

  // --- หน้าจอยืนยันการจองสำเร็จ (Success Screen) ---
  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-12 bg-white shadow-2xl rounded-sm max-w-md border-t-8 border-[#E5C595]">
          <div className="flex justify-center mb-8 text-[#E5C595]">
             <CheckCircle2 size={80} strokeWidth={1} className="animate-bounce" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4 uppercase tracking-tighter">
            {t('booking_confirmed', 'Booking Confirmed')}
          </h1>
          <p className="text-gray-500 mb-8 text-[11px] tracking-[0.2em] leading-relaxed uppercase font-medium">
            {t('booking_success_msg', 'Your reservation at The Old Phuket has been successfully recorded. Our team will contact you shortly to finalize the details.')}
          </p>
          <button 
            onClick={() => router.push('/')} 
            className="w-full bg-gray-900 text-white py-4 font-bold tracking-[0.3em] text-[10px] uppercase shadow-lg hover:bg-[#E5C595] transition-all"
          >
            {t('back_to_home', 'Back to Home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28 font-sans antialiased text-left">
      <Head><title>Confirm Your Stay - The Old Phuket</title></Head>
      
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-widest font-bold">
          <ChevronLeft size={14} /> {t('back_to_selection', 'Back to Selection')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ซ้าย: ฟอร์มกรอกข้อมูล */}
          <div className="lg:col-span-2 text-left">
            <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 text-left">
              <h2 className="text-2xl font-serif font-bold mb-10 uppercase tracking-tight flex items-center gap-4 text-gray-800 text-left">
                <Users size={24} className="text-[#E5C595]" /> {t('guest_details', 'Guest Details')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="md:col-span-2 text-left">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 text-left">
                      {t('full_name', 'Full Name')}
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm uppercase tracking-widest text-gray-800" 
                      required 
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 text-left">
                      {t('email_address', 'Email Address')}
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm text-gray-800" 
                      required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 text-left">
                      {t('phone_number', 'Phone Number')}
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+66" 
                      className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#E5C595] transition-all text-sm text-gray-800" 
                      required 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-10 text-center">
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white py-6 font-bold tracking-[0.4em] text-[10px] uppercase hover:bg-[#c5a97d] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:bg-gray-400"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : t('finalize_booking', "Finalize Booking")} <span className="text-xs">→</span>
                  </button>
                  <p className="text-center text-[9px] text-gray-300 mt-6 uppercase tracking-[0.2em]">
                    {t('agree_terms', 'By clicking, you agree to our terms and conditions.')}
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* ขวา: สรุปบิลค่าใช้จ่าย */}
          <div className="lg:col-span-1 text-left">
            <div className="bg-white shadow-2xl sticky top-28 border-t-8 border-[#E5C595] overflow-hidden text-left">
              <div className="p-8 border-b border-gray-50 text-left">
                {/* ชื่อห้องเป็นภาษาอังกฤษเสมอ */}
                <h3 className="font-serif font-bold text-xl mb-6 text-gray-800 uppercase tracking-tight text-left">
                  {roomData?.name || "Room Selection"}
                </h3>
                <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-left">
                  <div className="flex items-center gap-4"><Calendar size={14} className="text-[#E5C595]" /> {checkIn} — {checkOut}</div>
                  <div className="flex items-center gap-4"><Home size={14} className="text-[#E5C595]" /> {totalNights} {t('night_stay', 'Night(s) Stay')}</div>
                  <div className="flex items-center gap-4 text-left"><Users size={14} className="text-[#E5C595]" /> {adults} {t('adults', 'Adults')}, {children} {t('children', 'Children')}</div>
                </div>
              </div>

              <div className="p-8 space-y-5 bg-gray-50/30 text-left">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-gray-400">{t('average_per_night', 'Average Per Night')}</span>
                  <span className="font-bold text-gray-700">THB {roomPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                  <span className="text-gray-400">{t('taxes_fees', 'Taxes & Fees (7% VAT)')}</span>
                  <span className="font-bold text-green-600 uppercase">{t('included', 'Included')}</span>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between items-end text-left">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">
                    {t('total_price', 'Total Price')}
                  </span>
                  <div className="text-right">
                    <p className="text-3xl font-serif font-bold text-gray-900 leading-none">THB {grandTotal.toLocaleString()}</p>
                    <p className="text-[8px] text-gray-400 mt-2 uppercase">{t('net_price', 'Net Price (VAT Included)')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-5 flex items-center justify-center gap-3">
                 <CreditCard size={16} className="text-[#E5C595]" />
                 <span className="text-[9px] text-white uppercase tracking-widest font-bold">
                   {t('payment_coming_soon', 'Payment integration coming soon')}
                 </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}