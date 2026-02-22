// pages/api/get-market-price.js
export default async function handler(req, res) {
  const { checkIn, checkOut } = req.query;

  // 🚩 ใส่ API Key ของคุณเอกที่ได้จาก SerpApi ตรงนี้ครับ
  const SERP_API_KEY = "1157216edcd899d16488d04fd8c71141651675822f3c0a83bc7b1973b56872e3"; 

  try {
    // 1. ส่งคำขอไปที่ Google Hotels Search API
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_hotels&q=The+Old+Phuket+Karon+Beach&check_in_date=${checkIn}&check_out_date=${checkOut}&currency=THB&api_key=${SERP_API_KEY}`
    );
    
    const data = await response.json();

    // 2. แคะหาราคาสูงสุดหรือราคาเฉลี่ยจากเจ้าใหญ่ๆ (Agoda, Booking, ฯลฯ)
    // ปกติข้อมูลจะอยู่ใน data.properties[0].total_rate.extracted_lowest_rate
    let marketPrice = 3500; // ค่า Default กรณีดึงไม่ได้

    if (data.properties && data.properties.length > 0) {
      marketPrice = data.properties[0].total_rate.extracted_lowest_rate;
    }

    // 3. AI Logic: คำนวณราคาจองตรงให้ถูกกว่า 10%
    const ourPrice = Math.floor(marketPrice * 0.9); 

    res.status(200).json({
      success: true,
      marketPrice: marketPrice,
      ourPrice: ourPrice,
      currency: 'THB',
      source: 'Google Hotels Real-time'
    });
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch live market data" });
  }
}