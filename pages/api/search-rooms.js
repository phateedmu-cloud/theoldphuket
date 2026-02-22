import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { checkIn, checkOut, adults, children } = req.query;

  try {
    // ดึงข้อมูล RoomType ทั้งหมดจาก Vercel Database
    // ปรับลด include เพื่อป้องกันปัญหา Schema mismatch ระหว่างเปิดเครื่องใหม่
    const allRoomTypes = await prisma.roomType.findMany();

    // ดึงข้อมูลการจองในช่วงวันที่เลือก เพื่อเช็คห้องว่าง
    const existingBookings = await prisma.booking.findMany({
      where: {
        OR: [
          {
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) },
          },
        ],
      },
    });

    // Logic ง่ายๆ เพื่อให้หน้าเว็บแสดงผลห้องพักได้ทันที
    const availableRooms = allRoomTypes.map(type => {
      // นับการจองของห้องประเภทนี้
      const bookedCount = existingBookings.filter(b => b.roomTypeId === type.id).length;
      
      return {
        ...type,
        // กำหนดจำนวนห้องว่างเริ่มต้นที่ 5 ห้อง (หากยังไม่ได้ตั้งจำนวนห้องจริงใน DB)
        availableCount: 5 - bookedCount,
      };
    }).filter(type => type.availableCount > 0);

    return res.status(200).json({ success: true, data: availableRooms });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }
}