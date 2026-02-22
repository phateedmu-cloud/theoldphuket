// pages/api/update-status.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { bookingId, newStatus } = req.body;

  try {
    // สั่งให้ Database อัปเดตสถานะตาม ID ที่ส่งมา
    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    console.log(`✅ [Database] อัปเดตสถานะการจอง ${bookingId} เป็น ${newStatus} เรียบร้อย!`);
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('❌ [Update Error]:', error);
    return res.status(500).json({ success: false, message: 'ไม่สามารถอัปเดตสถานะได้' });
  }
}