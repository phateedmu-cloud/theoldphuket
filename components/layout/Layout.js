/*******************************************************************************
 * ไฟล์: components/layout/Layout.js
 * * ตัวเชื่อมหลัก (Wrapper)
 * * หน้าที่: แสดง Navbar ด้านบน และ Footer ด้านล่างของทุกหน้าอัตโนมัติ
 ******************************************************************************/

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col font-sans text-gray-900">
      
      {/* 1. ส่วนหัว (Navbar) */}
      <Navbar />

      {/* 2. ส่วนเนื้อหา (Content) */}
      {/* flex-grow จะช่วยดัน Footer ให้ลงไปอยู่ล่างสุดเสมอ แม้เนื้อหาหน้านั้นจะน้อย */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. ส่วนท้าย (Footer) */}
      <Footer />
      
    </div>
  );
}