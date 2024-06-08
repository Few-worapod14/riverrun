import { CarouselBox } from '@/components/Carousel/Carousel'
import { RootLayout } from '@/components/Layout/Layout'
import { Grid, LoadingOverlay, Paper } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MOCKUP = {
  id: 1,
  name: 'standard',
  pricePerNight: 1000,
  amount: 4,
  detail: '',
  isActive: true,
  createdAt: '2024-05-02T23:08:39.965Z',
  updatedAt: '2024-05-04T08:15:48.029Z',
  category: {
    id: 1,
    name: 'ทั่วไป',
    isActive: true
  },
  images: [
    {
      id: 6,
      fileName: '1714770043697-7q7wyi-IMG_7662.JPG',
      path: '_uploads/1714770043697-7q7wyi-IMG_7662.JPG',
      fullPath: 'http://dev.zlalabs.com/api/_uploads/1714770043697-7q7wyi-IMG_7662.JPG'
    },
    {
      id: 7,
      fileName: '1714846571225-u4b5u8-IMG_7665.JPG',
      path: '_uploads/1714846571225-u4b5u8-IMG_7665.JPG',
      fullPath: 'http://dev.zlalabs.com/api/_uploads/1714846571225-u4b5u8-IMG_7665.JPG'
    },
    {
      id: 8,
      fileName: '1714848294397-btews-IMG_9985.JPG',
      path: '_uploads/1714848294397-btews-IMG_9985.JPG',
      fullPath: 'http://dev.zlalabs.com/api/_uploads/1714848294397-btews-IMG_9985.JPG'
    }
  ],
  amenities: [
    { name: 'ห้องอาบน้ำ', lists: [{ name: 'ห้องอาบน้ำแบบฝักบัว' }] },
    {
      name: 'ห้องครัว',
      lists: [
        {
          name: 'เตาไฟฟ้า'
        },
        {
          name: 'ไมโครเวฟ'
        },
        {
          name: 'ตู้เย็น'
        }
      ]
    },
    {
      name: 'ห้องนอน',
      lists: [
        {
          name: 'เตียงควีนไซส์'
        },
        {
          name: 'เตียงโซฟาเบด'
        },
        {
          name: 'โซฟา'
        }
      ]
    }
  ]
}
export default function RoomViewPage() {
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [room, setRoom] = useState<RoomDto | null>(null)

  useEffect(() => {
    handleFetchRooms()
  }, [])

  const handleFetchRooms = async () => {
    // const res = await apiRoom.getRoomById(Number(id))

    // if (res.success) {
    //   setRoom(res.data)
    //   setLoading(false)
    // }
    setLoading(false)
    setRoom(MOCKUP)
  }

  return loading ? (
    <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
  ) : (
    <RootLayout>
      <Paper shadow="xs" p="xl">
        <Grid>
          <Grid.Col span={12}>
            <h2>{room.name}</h2>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <CarouselBox data={room.images.map((x) => ({ image: x.fullPath }))} height={400} />
          </Grid.Col>
        </Grid>
        <Grid>฿ {room.pricePerNight}</Grid>
        <Grid>{room.detail}</Grid>

        <Grid>
          <Grid.Col span={12}>
            <h3>สิ่งอำนวยความสะดวกในห้อง</h3>
          </Grid.Col>
          {room.amenities?.map((amenity) => (
            <Grid.Col span={12}>
              <h3>{amenity.name}</h3>
              {amenity.lists.map((list) => {
                return <li>{list.name}</li>
              })}
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
    </RootLayout>
  )
}
