import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState("th"); 
  const messagesEndRef = useRef(null);

  const updateLanguageSettings = () => {
    // ดึงภาษามาจาก LocalStorage
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("site_lang") || "EN" : "EN";
    
    let lang = "th";
    let greeting = "สวัสดีค่ะ ยินดีต้อนรับสู่ The Old Phuket Karon Beach Resort ค่ะ ลิซ่ายินดีให้บริการ วันนี้มีอะไรให้ลิซ่าช่วยไหมคะ?";

    // 🌐 พจนานุกรมฉบับสมบูรณ์ (เพิ่ม DE และ JA แล้ว!)
    switch (savedLang.toUpperCase()) {
      case 'EN':
        lang = "en";
        greeting = "Hello! Welcome to The Old Phuket Karon Beach Resort. I am Lisa, your virtual assistant. How can I help you today?";
        break;
      case 'CN':
      case 'ZH':
        lang = "zh-CN";
        greeting = "你好！欢迎来到普吉老城卡伦海滩度假村。我是Lisa，您的虚拟助手。今天我能为您做些什么？";
        break;
      case 'RU':
        lang = "ru";
        greeting = "Здравствуйте! Добро пожаловать в The Old Phuket Karon Beach Resort. Я Лиза, ваш виртуальный помощник. Чем я могу помочь вам сегодня?";
        break;
      case 'DE': // 🇩🇪 ภาษาเยอรมัน
        lang = "de";
        greeting = "Hallo! Willkommen im The Old Phuket Karon Beach Resort. Ich bin Lisa, Ihre virtuelle Assistentin. Wie kann ich Ihnen heute helfen?";
        break;
      case 'JA': // 🇯🇵 ภาษาญี่ปุ่น (บางเว็บใช้ JP หรือ JA)
      case 'JP':
        lang = "ja";
        greeting = "こんにちは！ジ オールド プーケット カロン ビーチ リゾートへようこそ。私はバーチャルアシスタントのリサです。本日はどのようなご用件でしょうか？";
        break;
      case 'MY':
        lang = "ms";
        greeting = "Helo! Selamat datang ke The Old Phuket Karon Beach Resort. Saya Lisa, pembantu maya anda. Bagaimana saya boleh membantu anda hari ini?";
        break;
      case 'SV':
        lang = "sv";
        greeting = "Hej! Välkommen till The Old Phuket Karon Beach Resort. Jag är Lisa, din virtuella assistent. Hur kan jag hjälpa dig idag?";
        break;
      case 'IT':
        lang = "it";
        greeting = "Ciao! Benvenuto al The Old Phuket Karon Beach Resort. Sono Lisa, il tuo assistente virtuale. Come posso aiutarti oggi?";
        break;
      case 'ES':
        lang = "es";
        greeting = "¡Hola! Bienvenido a The Old Phuket Karon Beach Resort. Soy Lisa, tu asistente virtual. ¿Cómo puedo ayudarte hoy?";
        break;
      case 'TH':
      default:
        lang = "th";
        break;
    }

    setCurrentLang(lang);
    setMessages(prev => {
      // ถ้าไม่มีข้อความ หรือมีแค่ข้อความต้อนรับ ให้เปลี่ยนภาษาข้อความต้อนรับได้เลย
      if (prev.length <= 1) return [{ role: "bot", text: greeting }];
      return prev;
    });
  };

  useEffect(() => {
    // ส่งคำสั่งล้างความจำไปที่หลังบ้าน
    fetch("https://aiready-central.onrender.com/api/reset").catch(e => console.log("Reset memory failed", e));
    
    updateLanguageSettings();

    const handleLangChange = () => updateLanguageSettings();
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://aiready-central.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userText, 
          language: currentLang,
          // 🔑 ส่งรหัสโรงแรมไปให้หลังบ้านรู้ว่าต้องสวมบทเป็นใคร
          hotelId: "THE_OLD_PHUKET" 
        }), 
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      let errorMsg = "ขออภัยค่ะ ระบบเชื่อมต่อขัดข้อง รบกวนลองใหม่นะคะ";
      if(currentLang === 'en') errorMsg = "Sorry, connection failed. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getUIText = () => {
    switch(currentLang) {
      case 'en': return { typing: "Typing... ✍️", send: "Send", placeholder: "Type your message here..." };
      case 'zh-CN': return { typing: "正在输入... ✍️", send: "发送", placeholder: "在此输入您的消息..." };
      case 'ru': return { typing: "Печатает... ✍️", send: "Отправить", placeholder: "Введите ваше сообщение здесь..." };
      case 'de': return { typing: "Schreibt... ✍️", send: "Senden", placeholder: "Schreiben Sie hier Ihre Nachricht..." };
      case 'ja': return { typing: "入力中... ✍️", send: "送信", placeholder: "ここにメッセージを入力してください..." };
      case 'ms': return { typing: "Menaip... ✍️", send: "Hantar", placeholder: "Taip mesej anda di sini..." };
      case 'sv': return { typing: "Skriver... ✍️", send: "Skicka", placeholder: "Skriv ditt meddelande här..." };
      case 'it': return { typing: "Sta scrivendo... ✍️", send: "Invia", placeholder: "Scrivi un messaggio qui..." };
      case 'es': return { typing: "Escribiendo... ✍️", send: "Enviar", placeholder: "Escribe tu mensaje aquí..." };
      case 'th':
      default: return { typing: "กำลังพิมพ์... ✍️", send: "ส่ง", placeholder: "พิมพ์ข้อความที่นี่..." };
    }
  };
  const uiText = getUIText();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col border border-gray-200">
          <div className="bg-[#d4af37] text-white p-4 font-bold text-center flex justify-between items-center">
            <span>🤖 Lisa - The Old Phuket</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 font-bold text-xl">&times;</button>
          </div>
          
          <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className={`max-w-[85%] p-3 rounded-2xl ${msg.role === "user" ? "bg-[#d4af37] text-white self-end rounded-br-sm" : "bg-gray-200 text-gray-800 self-start rounded-bl-sm"}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-gray-800 self-start rounded-2xl rounded-bl-sm p-3 max-w-[85%] text-sm">
                {uiText.typing}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={uiText.placeholder}
              className="flex-1 border rounded-full px-4 py-2 outline-none focus:border-[#d4af37] text-sm text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-[#d4af37] text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-600 transition"
            >
              {uiText.send}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#d4af37] hover:bg-yellow-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition transform hover:scale-105"
      >
        {isOpen ? "⬇️" : "💬"}
      </button>
    </div>
  );
}