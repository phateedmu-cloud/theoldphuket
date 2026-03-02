// context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('EN');

  // โหลดภาษาที่เคยเลือกไว้จากเครื่องลูกค้าตอนเปิดเว็บครั้งแรก
  useEffect(() => {
    const savedLang = localStorage.getItem('userLanguage');
    if (savedLang) {
      setLang(savedLang);
      // ✅ อัปเดตให้คีย์ของแชทบอทตรงกันตั้งแต่ตอนโหลดเว็บ
      localStorage.setItem('site_lang', savedLang); 
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('userLanguage', newLang);
    
    // 📢 1. เซฟภาษาลงคีย์ที่แชทบอทรออ่าน ('site_lang')
    localStorage.setItem('site_lang', newLang); 
    // 📢 2. ใช้โทรโข่งตะโกนบอกแชทบอทว่า "เปลี่ยนภาษาแล้วนะ!!"
    window.dispatchEvent(new Event('languageChanged')); 
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);