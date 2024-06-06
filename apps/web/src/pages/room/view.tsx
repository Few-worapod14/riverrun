import { CarouselBox } from '@/components/Carousel/Carousel'
import { RootLayout } from '@/components/Layout/Layout'
import * as apiRoom from '@/services/room'
import { Grid, LoadingOverlay, Paper } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function RoomViewPage() {
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [room, setRoom] = useState<RoomDto | null>(null)

  useEffect(() => {
    handleFetchRooms()
  }, [])

  const handleFetchRooms = async () => {
    const res = await apiRoom.getRoomById(Number(id))

    if (res.success) {
      setRoom(res.data)
      setLoading(false)
    }
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
        <Grid>
          <Grid.Col span={12}>฿ {room.pricePerNight}</Grid.Col>
        </Grid>
        {room.detail?.length > 0 ? (
          <Grid>
            <Grid.Col span={12}>{room.detail}</Grid.Col>
          </Grid>
        ) : null}

        {room.amenities?.length > 0 ? (
          <Grid>
            <Grid.Col span={12}>
              <strong>สิ่งอำนวยความสะดวกในห้อง</strong>
            </Grid.Col>
            <Grid.Col span={12}>
              {room.amenities?.map((amenity) => (
                <>
                  <strong>{amenity.name}</strong>
                  {amenity.lists.map((list) => {
                    return <li>{list.name}</li>
                  })}
                </>
              ))}
            </Grid.Col>
          </Grid>
        ) : null}
      </Paper>
    </RootLayout>
  )
}
