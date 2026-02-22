// pages/api/get-bookings.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // ให้ดึงข้อมูลได้เฉพาะวิธี GET (การเรียกดูข้อมูล)
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // สั่งให้ Prisma ไปดึงข้อมูลการจองทั้งหมดจาก Database 
    // และเรียงลำดับตามวันที่จองล่าสุด (ใครจองใหม่สุดอยู่บน)
    const allBookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });

    // ส่งข้อมูลกลับไปให้หน้า Dashboard
    return res.status(200).json({ success: true, data: allBookings });
  } catch (error) {
    console.error('❌ [API Error]:', error);
    return res.status(500).json({ success: false, message: 'ไม่สามารถดึงข้อมูลการจองได้' });
  }
}