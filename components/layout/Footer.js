// components/layout/Footer.js
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const goldColor = '#E5C595'; // สีทองหรูหราสำหรับ AI ready Hotel
  const greenColor = '#4ADE80'; // สีเขียวสว่างสำหรับ Click and Go

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        
        {/* 1. ส่วนเมนู Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <Link href="/" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Home
          </Link>
          <Link href="/accommodation" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Accommodation
          </Link>
          <Link href="/facilities" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Facilities
          </Link>
          <Link href="/dining" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Dining
          </Link>
          <Link href="/gallery" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Gallery
          </Link>
          <Link href="/contact" className="text-sm font-light tracking-widest uppercase hover:text-[#E5C595] transition">
            Contact Us
          </Link>
          <Link href="/book" className="text-sm font-bold tracking-widest uppercase text-[#E5C595] hover:opacity-80 transition border-b border-[#E5C595]">
            Book Now
          </Link>
        </div>

        {/* 2. ส่วน Branding & Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center space-y-4">
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <span className="text-lg font-serif italic tracking-wide" style={{ color: goldColor }}>
              AI ready Hotel
            </span>
            <span className="hidden md:inline text-gray-700">|</span>
            {/* แก้ไข: เอาขีดเส้นใต้ออกเรียบร้อยครับ */}
            <span className="text-sm font-medium tracking-tight" style={{ color: greenColor }}>
              powered by <span className="font-bold">Click and Go</span>
            </span>
          </div>

          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
            © 2026 THE OLD PHUKET KARON BEACH. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}