import '../styles/globals.css';
import Layout from '../components/layout/Layout';
// ✅ เพิ่มการนำเข้า LanguageProvider
import { LanguageProvider } from '../context/LanguageContext'; 

// 1. นำเข้าฟอนต์จาก Google
import { Playfair_Display, Prompt } from 'next/font/google';

// 2. ตั้งค่าฟอนต์ Playfair Display (สำหรับหัวข้อ)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', 
  display: 'swap',
});

// 3. ตั้งค่าฟอนต์ Prompt (สำหรับเนื้อหาทั่วไป รองรับภาษาไทย)
const prompt = Prompt({
  weight: ['300', '400', '500', '700'], 
  subsets: ['latin', 'thai'], 
  variable: '--font-prompt',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    // ✅ 4. ครอบด้วย LanguageProvider เพื่อใช้ระบบหลายภาษาทั้งเว็บ
    <LanguageProvider>
      <div className={`${playfair.variable} ${prompt.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </LanguageProvider>
  );
}

export default MyApp;