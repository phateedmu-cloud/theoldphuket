import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Globe, ChevronDown, Check, Home } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const router = useRouter();
  
  // Logic: ตรวจสอบว่าอยู่หน้าภาษาไทยหรือไม่
  const isThai = router.pathname.startsWith('/th');
  const currentLang = isThai ? 'TH' : 'EN';
  
  // Logic: สร้าง Prefix สำหรับลิงก์ (/th หรือ ว่างเปล่า)
  const linkPrefix = isThai ? '/th' : '';

  // Logic: เช็คว่าเป็นหน้าแรกหรือไม่
  const isHomePage = router.pathname === '/' || router.pathname === '/th';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function: สลับภาษา (Redirect ไปหน้าคู่ขนาน)
  const toggleLanguage = (targetLang) => {
    setIsLangOpen(false);
    if (targetLang === currentLang) return;

    let newPath;
    if (targetLang === 'TH') {
      // เปลี่ยนจาก EN -> TH (เติม /th ข้างหน้า)
      newPath = router.pathname === '/' ? '/th' : `/th${router.pathname}`;
    } else {
      // เปลี่ยนจาก TH -> EN (ลบ /th ออก)
      newPath = router.pathname.replace('/th', '') || '/';
    }
    router.push(newPath);
  };

  const isTransparent = isHomePage && !isScrolled;
  const navClass = isTransparent 
    ? 'bg-gradient-to-b from-black/80 to-transparent text-white shadow-none' 
    : 'bg-gray-800 text-white shadow-md'; 

  const logoBg = 'bg-white p-1 rounded-sm'; 
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 py-2 md:py-3 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* Logo Link */}
          <Link href={isThai ? "/th" : "/"}>
            <div className="cursor-pointer">
               <img src="/images/logo-01.jpg" alt="The Old Phuket" className={`h-10 md:h-16 w-auto object-contain ${logoBg}`} />
            </div>
          </Link>

          {/* Right Menu */}
          <div className="flex items-center space-x-3 md:space-x-6">
            
            {/* Home Button */}
            <Link href={isThai ? "/th" : "/"}>
               <button className="hidden md:flex items-center justify-center hover:text-[#E5C595] transition-colors text-white" title="Back to Home">
                 <Home size={22} />
               </button>
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center text-xs md:text-sm font-medium transition-colors focus:outline-none hover:text-[#E5C595] text-white">
                <Globe size={18} className="mr-1" /> {currentLang} <ChevronDown size={12} className="ml-1" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-xl py-2 z-50 border border-gray-700">
                  <button onClick={() => toggleLanguage('EN')} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                    <span className="w-6">{currentLang === 'EN' && <Check size={14} className="text-[#E5C595]"/>}</span> English
                  </button>
                  <button onClick={() => toggleLanguage('TH')} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                    <span className="w-6">{currentLang === 'TH' && <Check size={14} className="text-[#E5C595]"/>}</span> ภาษาไทย
                  </button>
                </div>
              )}
            </div>

            {/* Book Now */}
            <Link href={`${linkPrefix}/accommodation`}>
               <button className="bg-[#E5C595] hover:bg-[#d4b07e] text-white px-3 py-1.5 md:px-6 md:py-2 uppercase text-[10px] md:text-xs font-bold tracking-widest rounded-sm transition-all shadow-md border border-transparent whitespace-nowrap">
                 {isThai ? 'จองห้องพัก' : 'Book Now'}
               </button>
            </Link>

            {/* Hamburger */}
            <button onClick={() => setIsMenuOpen(true)} className="hover:text-[#E5C595] transition-colors text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-50 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-6 right-6">
          <button onClick={closeMenu} className="text-white hover:text-[#E5C595]"><X size={32} /></button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-2xl md:text-3xl font-light tracking-widest">
          <Link href={isThai ? "/th" : "/"} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'หน้าแรก' : 'HOME'}</Link>
          <Link href={`${linkPrefix}/accommodation`} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'ห้องพัก' : 'ACCOMMODATION'}</Link>
          <Link href={`${linkPrefix}/facilities`} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'สิ่งอำนวยความสะดวก' : 'FACILITIES'}</Link>
          <Link href={`${linkPrefix}/dining`} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'อาหารและเครื่องดื่ม' : 'DINING'}</Link>
          <Link href={`${linkPrefix}/gallery`} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'แกลเลอรี' : 'GALLERY'}</Link>
          <Link href={`${linkPrefix}/contact`} onClick={closeMenu} className="hover:text-[#E5C595] transition-colors">{isThai ? 'ติดต่อเรา' : 'CONTACT US'}</Link>
        </div>
      </div>
    </>
  );
}