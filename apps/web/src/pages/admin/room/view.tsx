import * as apiRoom from '@/services/admin-room.ts'
import { Button, Flex } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'

import './create.scss'

export default function AdminRoomViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [room, setRoom] = useState<RoomDto | null>(null)

  useEffect(() => {
    handleGetRoom()
  }, [])

  const handleGetRoom = async () => {
    const res = await apiRoom.getById(Number(id))
    if (res.success) {
      setRoom(res.data!)
    }
  }

  return (
    <AdminLayout>
      <h3>เพิ่มห้อง</h3>

      <div className="mb-5">ประเภทห้อง: {room?.category.name}</div>

      <div className="mb-5">ชื่อห้อง: {room?.name}</div>

      <div className="mb-5">ราคา: {room?.pricePerNight} ฿</div>

      <div className="mb-5">รายละเอียดห้อง: {room?.detail}</div>

      <div className="mb-5">สถานะ: {room?.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</div>

      <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
        <Button
          onClick={() => {
            // handleGetRoom()
            navigate('/admin/room')
          }}
        >
          กลับ
        </Button>
      </Flex>
    </AdminLayout>
  )
}
