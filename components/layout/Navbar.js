import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Globe, ChevronDown, Check, Home } from 'lucide-react';
// ✅ แก้ไขแล้ว: เพิ่ม ../ เป็น 2 ชุด เพื่อถอยหลัง 2 ชั้นออกไปหาโฟลเดอร์ context
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const { lang, changeLanguage } = useLanguage(); 
  const router = useRouter();

  const languages = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'TH', label: 'ภาษาไทย', flag: '🇹🇭' },
    { code: 'CN', label: '简体中文', flag: '🇨🇳' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'JP', label: '日本語', flag: '🇯🇵' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const content = {
    EN: { home: 'HOME', room: 'ACCOMMODATION', fac: 'FACILITIES', dine: 'DINING', gall: 'GALLERY', contact: 'CONTACT US', book: 'BOOK NOW' },
    TH: { home: 'หน้าแรก', room: 'ห้องพัก', fac: 'สิ่งอำนวยความสะดวก', dine: 'อาหารและเครื่องดื่ม', gall: 'แกลเลอรี', contact: 'ติดต่อเรา', book: 'จองห้องพัก' },
    CN: { home: '首页', room: '客房住宿', fac: '酒店设施', dine: '餐饮美食', gall: '图库', contact: '联系我们', book: '立即预订' },
    RU: { home: 'ГЛАВНАЯ', room: 'НОМЕРА', fac: 'УСЛУГИ', dine: 'ПИТАНИЕ', gall: 'ГАЛЕРЕЯ', contact: 'КОНТАКТЫ', book: 'ЗАБРОНИРОВАТЬ' },
    JP: { home: 'ホーム', room: '宿泊施設', fac: '施設', dine: 'ダイニング', gall: 'ギャラリー', contact: 'お問い合わせ', book: '今すぐ予約' },
    DE: { home: 'STARTSEITE', room: 'UNTERKUNFT', fac: 'ANLAGEN', dine: 'GASTRONOMIE', gall: 'GALERIE', contact: 'KONTAKT', book: 'JETZT BUCHEN' }
  };

  const t = (key) => {
    if (content[lang] && content[lang][key]) {
      return content[lang][key];
    }
    return content['EN'][key];
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (code) => {
    changeLanguage(code); 
    setIsLangOpen(false); 
  };

  const isHomePage = router.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;
  
  const navClass = isTransparent 
    ? 'bg-gradient-to-b from-black/80 to-transparent text-white shadow-none' 
    : 'bg-gray-800 text-white shadow-md'; 

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 py-2 md:py-3 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-left">
          
          <Link href="/">
            <div className="cursor-pointer">
               <img src="/images/logo-01.jpg" alt="The Old Phuket" className="h-10 md:h-16 w-auto object-contain bg-white p-1 rounded-sm" />
            </div>
          </Link>

          <div className="flex items-center space-x-3 md:space-x-6">
            
            <Link href="/">
               <button className="hidden md:flex items-center justify-center hover:text-[#E5C595] transition-colors text-white" title={t('home')}>
                 <Home size={22} />
               </button>
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className="flex items-center text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-[#E5C595] text-white"
              >
                <Globe size={16} className="mr-2 text-[#E5C595]" /> {lang} <ChevronDown size={12} className="ml-1" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 rounded-sm shadow-2xl py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  {languages.map((l) => (
                    <button 
                      key={l.code}
                      onClick={() => toggleLanguage(l.code)} 
                      className="flex items-center justify-between w-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      <span className={lang === l.code ? 'text-[#E5C595]' : 'text-gray-600'}>{l.label}</span>
                      <span className="text-sm">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/search">
               <button className="bg-[#E5C595] hover:bg-white hover:text-[#E5C595] text-white px-3 py-1.5 md:px-6 md:py-2 uppercase text-[10px] md:text-xs font-black tracking-[0.2em] rounded-sm transition-all shadow-lg border border-transparent whitespace-nowrap">
                 {t('book')}
               </button>
            </Link>

            <button onClick={() => setIsMenuOpen(true)} className="hover:text-[#E5C595] transition-colors text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-gray-900 bg-opacity-98 z-[60] transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-6 right-6">
          <button onClick={closeMenu} className="text-white hover:text-[#E5C595]"><X size={32} /></button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-xl md:text-2xl font-serif tracking-[0.3em] uppercase">
          <Link href="/" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('home')}</Link>
          <Link href="/accommodation" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('room')}</Link>
          <Link href="/facilities" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('fac')}</Link>
          <Link href="/dining" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('dine')}</Link>
          <Link href="/gallery" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('gall')}</Link>
          <Link href="/contact" onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{t('contact')}</Link>
        </div>
      </div>
    </>
  );
}