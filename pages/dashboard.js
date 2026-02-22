import React, { useState } from 'react';
import Head from 'next/head';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingDown, TrendingUp, Users, Calendar, 
  DollarSign, Zap, Bell, Settings, LogOut, Menu 
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ข้อมูลจำลองการเปรียบเทียบราคาตลาด vs ราคาหน้าเว็บ
  const priceData = [
    { day: 'Mon', market: 3500, ourPrice: 3200 },
    { day: 'Tue', market: 3600, ourPrice: 3300 },
    { day: 'Wed', market: 3400, ourPrice: 3100 },
    { day: 'Thu', market: 3800, ourPrice: 3450 },
    { day: 'Fri', market: 4200, ourPrice: 3800 },
    { day: 'Sat', market: 4500, ourPrice: 4000 },
    { day: 'Sun', market: 4000, ourPrice: 3600 },
  ];

  // Component สำหรับการ์ดแสดงสถิติ
  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800">
      <Head>
        <title>Dashboard - The Old Phuket</title>
      </Head>

      {/* --- SIDEBAR (เมนูซ้ายมือ) --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 p-6 transition-transform duration-300 transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* ✅ ปรับ Logo และชื่อแบรนด์ตรงนี้ค่ะ */}
        <div className="flex items-center gap-3 mb-10 px-2">
          {/* โลโก้ The Old Phuket (กล่องสีขาวให้โลโก้เด่นขึ้น) */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
             <img src="/images/logo-01.jpg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          {/* ชื่อ The Old Phuket */}
          <span className="text-white font-bold text-lg tracking-tight leading-tight">
            The Old Phuket<br/>
            <span className="text-xs text-[#E5C595] font-normal">Manager</span>
          </span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Bookings', 'Pricing Intelligence', 'AI Settings', 'Reports'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item === 'Dashboard' ? 'bg-[#E5C595] text-slate-900 font-bold' : 'hover:bg-slate-800'}`}
            >
              <Zap className="w-5 h-5" />
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 transition-colors w-full">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (พื้นที่ทำงานขวามือ) --- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        
        {/* Header บน Dashboard */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden text-slate-600">
              <Menu />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Performance Overview</h1>
              <p className="text-slate-500 text-sm">Lisa AI กำลังติดตามราคาตลาดให้คุณแบบ Real-time</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="relative p-2 bg-white rounded-full shadow-sm border border-slate-200">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center gap-3 bg-white p-1 pr-4 rounded-full shadow-sm border border-slate-200">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">GM</div>
              <span className="text-sm font-medium text-slate-700">General Manager</span>
            </div>
          </div>
        </header>

        {/* 1. สรุปตัวเลข (Stats Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value="฿425,000" icon={DollarSign} color="bg-indigo-500" trend={12} />
          <StatCard title="Total Bookings" value="128" icon={Calendar} color="bg-sky-500" trend={8} />
          <StatCard title="Direct Savings" value="฿24,500" icon={TrendingDown} color="bg-emerald-500" trend={15} />
          <StatCard title="Market Beat Rate" value="98%" icon={Zap} color="bg-amber-500" />
        </div>

        {/* 2. กราฟและ AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* กราฟเปรียบเทียบราคา (Main Chart) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Market vs Direct Pricing</h2>
                <p className="text-xs text-slate-500">เปรียบเทียบราคาคู่แข่ง vs ราคาหน้าเว็บเรา (7 วันล่าสุด)</p>
              </div>
              <select className="bg-slate-50 border-none text-sm rounded-lg px-3 py-1 text-slate-600 outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Line type="monotone" dataKey="market" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Market Avg" />
                  {/* ✅ เปลี่ยนชื่อกราฟเส้นเป็น Official Web Price และปรับสีให้เข้าธีมโรงแรม */}
                  <Line type="monotone" dataKey="ourPrice" stroke="#E5C595" strokeWidth={3} dot={{r: 4, fill: '#E5C595'}} name="Official Web Price" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* กล่อง AI Insights Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Booking Source</h2>
            
            {/* กราฟแท่งจำลองแหล่งที่มา */}
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  {/* ✅ เปลี่ยนชื่อ Source เป็น Direct Website */}
                  <span className="text-slate-600 font-medium">Direct Website</span>
                  <span className="text-indigo-600 font-bold">65%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">OTA (Agoda/Booking)</span>
                  <span className="text-slate-400 font-bold">35%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-300 h-full w-[35%]"></div>
                </div>
              </div>
            </div>
            
            {/* กล่องคำแนะนำจาก Lisa */}
            <div className="mt-8 p-4 bg-[#fff8e1] rounded-xl border border-[#ffe0b2]">
              <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
                <Zap className="w-4 h-4" />
                Lisa AI Tip
              </div>
              <p className="text-xs text-amber-700 leading-relaxed mb-3">
                "ราคาคู่แข่งในวันเสาร์หน้าพุ่งสูงขึ้น 15% ลิซ่าแนะนำให้ปรับราคาขึ้นตาม แต่ยังคงส่วนลด Direct Booking ไว้เพื่อดึงลูกค้าค่ะ"
              </p>
              <button className="w-full py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-sm">
                Apply Optimization
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}