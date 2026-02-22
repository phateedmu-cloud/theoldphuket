// pages/api/create-booking.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // รับข้อมูลให้ตรงกับที่หน้าสรุปการจอง (book.js) ส่งมา
  const { fullName, email, phone, checkIn, checkOut, totalPrice, roomTypeId } = req.body;

  try {
    // บันทึกลง Database ของ Vercel
    const newBooking = await prisma.booking.create({
      data: {
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice: parseInt(totalPrice),
        roomTypeId: roomTypeId,
        status: 'PENDING', // รอตรวจสอบการชำระเงิน
      },
    });

    console.log(`✅ [Database] บันทึกการจองของคุณ ${fullName} เรียบร้อยแล้ว!`);

    return res.status(200).json({ success: true, bookingId: newBooking.id });
  } catch (error) {
    console.error('❌ [Booking Error]:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
}