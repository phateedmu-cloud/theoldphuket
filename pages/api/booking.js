// pages/api/booking.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerName, customerEmail, customerPhone, checkIn, checkOut, roomTypeId, totalPrice } = req.body;

    try {
      // 1. บันทึกข้อมูลการจองลง Database
      const newBooking = await prisma.booking.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          totalPrice: parseInt(totalPrice),
          roomTypeId,
          status: 'pending', // เริ่มต้นที่รอชำระเงิน
        },
      });

      // 2. ส่งผลลัพธ์กลับไปบอกหน้าบ้านว่า "จองสำเร็จแล้วนะ"
      return res.status(200).json({ success: true, bookingId: newBooking.id });
    } catch (error) {
      console.error('Booking Error:', error);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการจอง' });
    }
  } else {
    // ปฏิเสธ Method อื่นๆ ที่ไม่ใช่ POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}