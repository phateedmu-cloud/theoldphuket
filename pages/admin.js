import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LayoutDashboard, Calendar, CheckCircle, Clock, RefreshCcw, Check, XCircle, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/get-bookings');
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const updateStatus = async (bookingId, newStatus, message) => {
    if (!confirm(message)) return;
    try {
      const res = await fetch('/api/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, newStatus }),
      });
      if (res.ok) fetchBookings();
    } catch (err) { alert("เกิดข้อผิดพลาด"); }
  };

  useEffect(() => { fetchBookings(); }, []);

  // --- ส่วนคำนวณสรุปยอด (Stats) ---
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    revenue: bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-gray-400 bg-gray-50 pt-20">Updating System...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Head><title>Admin Dashboard - The Old Phuket</title></Head>

      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-32 pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="bg-gray-900 p-4 rounded-sm text-[#E5C595] shadow-2xl border border-white/10"><LayoutDashboard size={32} /></div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800 uppercase tracking-tight">Executive Dashboard</h1>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-1 text-left">The Old Phuket Sanctuary Control</p>
            </div>
          </div>
          <button onClick={fetchBookings} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors"><RefreshCcw size={14} /> Refresh Data</button>
        </div>

        {/* --- สรุปยอดด้านบน (Stats Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Bookings', val: stats.total, icon: <Users size={20}/>, color: 'text-blue-600' },
            { label: 'Pending Pay', val: stats.pending, icon: <Clock size={20}/>, color: 'text-amber-500' },
            { label: 'Confirmed', val: stats.confirmed, icon: <CheckCircle size={20}/>, color: 'text-green-600' },
            { label: 'Total Revenue', val: `฿${stats.revenue.toLocaleString()}`, icon: <TrendingUp size={20}/>, color: 'text-gray-900' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 shadow-xl border-b-4 border-gray-100 rounded-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-400">{s.label}</span>
                <span className={s.color}>{s.icon}</span>
              </div>
              <p className={`text-2xl font-serif font-bold ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Booking Table */}
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          <div className="bg-gray-900 px-8 py-4 border-b border-gray-800 text-left flex justify-between items-center">
            <p className="text-[#E5C595] text-[10px] uppercase tracking-[0.2em] font-bold">Recent Reservations</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[9px] uppercase tracking-[0.2em] font-black text-gray-400 text-left">
                  <th className="p-8">Guest Details</th>
                  <th className="p-8">Stay Period</th>
                  <th className="p-8">Amount</th>
                  <th className="p-8 text-center">Status</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-left">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/30 transition-all duration-300">
                    <td className="p-8">
                      <div className="font-bold text-gray-800 text-sm uppercase tracking-wide">{booking.customerName}</div>
                      <div className="text-[10px] text-gray-400 font-medium mt-1 uppercase">{booking.customerEmail}</div>
                      <div className="text-[10px] text-gray-400 italic">{booking.customerPhone}</div>
                    </td>
                    <td className="p-8">
                      <div className="text-xs text-gray-600 flex items-center gap-2 font-medium"><Calendar size={14} className="text-[#E5C595]" /> {new Date(booking.checkIn).toLocaleDateString('th-TH')} — {new Date(booking.checkOut).toLocaleDateString('th-TH')}</div>
                    </td>
                    <td className="p-8"><div className="font-serif font-bold text-lg text-gray-900 italic">THB {booking.totalPrice?.toLocaleString()}</div></td>
                    <td className="p-8 text-center">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full ${booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-200' : (booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200')}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        {booking.status === 'PENDING' && (
                          <>
                            <button onClick={() => updateStatus(booking.id, 'CONFIRMED', 'ยืนยันการรับชำระเงิน?')} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-sm shadow-md transition-all flex items-center gap-2 text-[9px] uppercase font-bold"><Check size={14} /> Confirm</button>
                            <button onClick={() => updateStatus(booking.id, 'CANCELLED', 'ต้องการยกเลิกการจองนี้ใช่หรือไม่?')} className="border border-red-200 text-red-400 hover:bg-red-50 p-2 rounded-sm transition-all"><XCircle size={14} /></button>
                          </>
                        )}
                      </div>
                    </td>
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