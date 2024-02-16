import { BookingDate } from '@/components/BookingDate/BookingDate'
import { RootLayout } from '@/components/Layout/Layout'
import * as api from '@/services/booking'
import { Button, Grid, Image, Paper } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchRoomPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [startBooking, setStartBooking] = useState(searchParams.get('startDate'))
  const [endBooking, setEndBooking] = useState(searchParams.get('endDate'))
  const [roomBooking, setRoomBooking] = useState(Number(searchParams.get('room')))

  const [rooms, setRooms] = useState<RoomDto[]>([])

  const handleSearch = ({ startDate, endDate, room }) => {
    const params = {
      startDate: startDate,
      endDate: endDate,
      room: room
    }
    const query = queryString.stringify(params, {
      skipNull: true
    })
    handleGetRoom()
    return navigate(`/search?${query}`)
  }

  useEffect(() => {
    handleGetRoom()
  }, [])

  const handleGetRoom = async () => {
    const res = await api.search(startBooking, endBooking, roomBooking)

    if (res.success) {
      setRooms(res.data)
    }
  }

  return (
    <RootLayout>
      <div className="mb-5">
        <BookingDate
          startBooking={startBooking}
          endBooking={endBooking}
          roomBooking={roomBooking}
          onSearch={handleSearch}
        />
      </div>

      <div>
        {rooms?.map((room, i) => {
          return (
            <Paper className="mb-5" shadow="xs" p="xl" key={i}>
              <Grid>
                <Grid.Col span={4}>
                  <Image src={room?.images?.[0]?.fullPath} />
                </Grid.Col>

                <Grid.Col span={8}>
                  <Grid>
                    <Grid.Col>{room.name}</Grid.Col>
                    <Grid.Col>{room.pricePerNight} ฿</Grid.Col>
                    <Grid.Col>
                      <Button>จองรอง</Button>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Paper>
          )
        })}
      </div>
    </RootLayout>
  )
}
