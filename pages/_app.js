/*******************************************************************************
 * ไฟล์: pages/_app.js (เพิ่มฟอนต์ Playfair Display และ Prompt)
 ******************************************************************************/
import '../styles/globals.css';
import Layout from '../components/layout/Layout';

// 1. นำเข้าฟอนต์จาก Google
import { Playfair_Display, Prompt } from 'next/font/google';

// 2. ตั้งค่าฟอนต์ Playfair Display (สำหรับหัวข้อ)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', // ตั้งชื่อตัวแปร
  display: 'swap',
});

// 3. ตั้งค่าฟอนต์ Prompt (สำหรับเนื้อหาทั่วไป รองรับภาษาไทย)
const prompt = Prompt({
  weight: ['300', '400', '500', '700'], // เลือกความหนาที่ใช้
  subsets: ['latin', 'thai'], // สำคัญ! ต้องมี thai
  variable: '--font-prompt',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    // 4. ส่งค่าฟอนต์ไปให้ทั้งเว็บไซต์ใช้งาน
    <div className={`${playfair.variable} ${prompt.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;