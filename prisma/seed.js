// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('กำลังล้างข้อมูลเก่าและเริ่มใส่ข้อมูลห้องพักใหม่...')

  // ล้างข้อมูลเก่าออกก่อน (ป้องกันข้อมูลซ้ำ)
  await prisma.booking.deleteMany({})
  await prisma.roomType.deleteMany({})

  const rooms = [
    {
      name: 'Deluxe Room',
      slug: 'deluxe-room',
      price: 2500,
      size: 38,
      guests: 2,
      totalStock: 10,
      description: 'ห้องพักสไตล์โปรตุกีสกว้างขวาง พร้อมสิ่งอำนวยความสะดวกครบครัน',
    },
    {
      name: 'Deluxe Pool Access',
      slug: 'deluxe-pool-access',
      price: 3500,
      size: 42,
      guests: 2,
      totalStock: 5,
      description: 'สะดวกสบายด้วยทางลงสระว่ายน้ำได้โดยตรงจากระเบียงห้องพัก',
    },
    {
      name: 'Garden Terrace',
      slug: 'garden-terrace',
      price: 2800,
      size: 40,
      guests: 2,
      totalStock: 8,
      description: 'ผ่อนคลายกับวิวสวนสวยและระเบียงส่วนตัวส่วนตัว',
    },
    {
      name: 'Private Pool Suite',
      slug: 'private-pool-suite',
      price: 5500,
      size: 65,
      guests: 2,
      totalStock: 3,
      description: 'ที่สุดแห่งความหรูหราด้วยสระว่ายน้ำส่วนตัวภายในห้องพัก',
    },
    {
      name: 'Family Room',
      slug: 'family-room',
      price: 4500,
      size: 55,
      guests: 4,
      totalStock: 4,
      description: 'ห้องพักขนาดใหญ่ที่ออกแบบมาเพื่อความสุขของทุกคนในครอบครัว',
    },
    {
      name: 'The Old Phuket Suite',
      slug: 'the-old-phuket-suite',
      price: 6500,
      size: 80,
      guests: 2,
      totalStock: 2,
      description: 'ห้องสวีทสุดพิเศษที่สะท้อนเอกลักษณ์ความคลาสสิกของภูเก็ต',
    }
  ]

  for (const room of rooms) {
    await prisma.roomType.create({
      data: room,
    })
  }

  console.log('✅ ใส่ข้อมูลห้องพักทั้ง 6 แบบเรียบร้อยแล้วครับ!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })