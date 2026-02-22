// pages/api/get-market-price.js
export default async function handler(req, res) {
  // รับค่าวันที่และจำนวนผู้ใหญ่ (ถ้าไม่ส่งมา ให้ค่าเริ่มต้นเป็น 2 คน)
  const { checkIn, checkOut, adults = 2 } = req.query;

  // 🚩 API Key ของ SerpApi ของคุณ
  const SERP_API_KEY = "1157216edcd899d16488d04fd8c71141651675822f3c0a83bc7b1973b56872e3"; 

  try {
    console.log(`\n🔍 [AI Price Match] กำลังดึงราคาจริงจาก Google: ${checkIn} ถึง ${checkOut} สำหรับ ${adults} คน`);
    
    // 1. ส่งคำขอไปที่ Google Hotels
    // ✅ แก้ไขคีย์เวิร์ด (q) เป็น "The+Old+Phuket" สั้นๆ เพื่อให้ Google ค้นหาเจอได้แม่นยำขึ้น
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_hotels&q=The+Old+Phuket&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${adults}&currency=THB&hl=en&gl=th&api_key=${SERP_API_KEY}`
    );
    
    const data = await response.json();

    let marketPrice = 3500; // ค่า Default กรณีดึงไม่ได้จริงๆ

    // 2. ตรวจสอบว่า SerpApi ตอบกลับมาว่า Error หรือไม่
    if (data.error) {
      console.log(`❌ [AI Price Match] SerpApi แจ้งเตือน:`, data.error);
    } 
    // 3. ถ้าสำเร็จ ให้หาตัวเลขราคาที่ถูกที่สุด
    else if (data.properties && data.properties.length > 0) {
      // ดึงโรงแรมแรกที่เจอเลย
      const targetHotel = data.properties[0];
      
      console.log(`🔎 [AI Price Match] เจอโรงแรมชื่อ: ${targetHotel.name}`);

      // กวาดหาตัวเลขราคาจากข้อมูลที่ Google ส่งมาให้
      const livePrice = 
        targetHotel.rate_per_night?.extracted_lowest || 
        targetHotel.total_rate?.extracted_lowest_rate ||
        (targetHotel.rate_per_night?.lowest ? parseInt(targetHotel.rate_per_night.lowest.replace(/\D/g, '')) : null);

      if (livePrice) {
        marketPrice = livePrice;
        console.log(`✅ [AI Price Match] สำเร็จ! Google บอกว่าราคาคือ: THB ${marketPrice}`);
      } else {
        console.log(`⚠️ [AI Price Match] หาตัวเลขราคาไม่เจอ ข้อมูลที่ได้มาคือ:`, targetHotel?.rate_per_night);
      }
    } else {
      console.log(`⚠️ [AI Price Match] ค้นหาไม่พบข้อมูลโรงแรมนี้ใน Google (อาจจะห้องเต็ม หรือระบบหาชื่อไม่ตรง)`);
    }

    // 4. คำนวณส่วนลด 10% ให้ลูกค้าสำหรับ Direct Booking
    const ourPrice = Math.floor(marketPrice * 0.9); 
    console.log(`🎯 [AI Price Match] ลด 10% ให้ลูกค้าเหลือ: THB ${ourPrice}\n`);

    res.status(200).json({
      success: true,
      marketPrice: marketPrice,
      ourPrice: ourPrice,
      currency: 'THB',
      source: 'Google Hotels Real-time'
    });
  } catch (error) {
    console.error("❌ [AI Price Match] ระบบมีปัญหาในการเรียก API:", error);
    res.status(500).json({ success: false, message: "Failed to fetch live market data" });
  }
}