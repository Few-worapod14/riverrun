import * as apiRoom from '@/services/admin-room.ts'
import { Button, Flex, Grid, Image, LoadingOverlay, Paper } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'

import './create.scss'

export default function AdminRoomViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [room, setRoom] = useState<RoomDto | null>(null)

  useEffect(() => {
    handleGetRoom()
  }, [])

  const handleGetRoom = async () => {
    const res = await apiRoom.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setRoom(res.data!)
    }
  }

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <h3>เพิ่มห้อง</h3>

          <Paper shadow="xs" p="xl">
            <Grid className="mb-5">
              <Grid.Col span={3}>ประเภทห้อง :</Grid.Col>

              <Grid.Col span={9}>{room?.category.name}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>ชื่อห้อง :</Grid.Col>
              <Grid.Col span={9}>{room?.name}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>ราคา :</Grid.Col>
              <Grid.Col span={9}>{room?.pricePerNight} ฿</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>รายละเอียดห้อง :</Grid.Col>

              <Grid.Col span={9}>{room?.detail}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>สถานะ :</Grid.Col>
              <Grid.Col span={9}>{room?.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</Grid.Col>
            </Grid>

            {room?.images.length != 0 ? (
              <Grid className="mb-5">
                {room?.images.map((x) => {
                  return (
                    <Grid.Col span={3}>
                      <Image src={x.fullPath} />
                    </Grid.Col>
                  )
                })}
              </Grid>
            ) : null}

            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
              <Button
                onClick={() => {
                  navigate('/admin/room')
                }}
              >
                กลับ
              </Button>
            </Flex>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
