import { BookingDate } from '@/components/BookingDate/BookingDate'
import { RootLayout } from '@/components/Layout/Layout'
import * as api from '@/services/booking'
import { useStore } from '@/store/store'
import { Button, Flex, Grid, Image, Paper } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import bgVideo from '@/assets/bg-video.mp4'

dayjs.extend(customParseFormat)

export default function SearchRoomPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setBooking } = useStore()

  const today = dayjs().add(1, 'days').format('DD-MM-YYYY')
  const nextDay = dayjs().add(2, 'days').format('DD-MM-YYYY')

  const [startBooking] = useState(searchParams.get('startDate') || today)
  const [endBooking] = useState(searchParams.get('endDate') || nextDay)
  const [roomAmount] = useState(Number(searchParams.get('room')) || 1)

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
    handleGetRoom(startDate, endDate, room)
    return navigate(`/search?${query}`)
  }

  useEffect(() => {
    handleGetRoom(startBooking, endBooking, roomAmount)
  }, [])

  const handleGetRoom = async (startDate, endDate, room) => {
    const res = await api.search(startDate, endDate, room)

    if (res.success) {
      setRooms(res.data)
    }
  }

  const handleBooking = (roomId: number) => {
    const start = dayjs(startBooking, 'DD-MM-YYYY')?.toDate()
    const end = dayjs(endBooking, 'DD-MM-YYYY')?.toDate()
    setBooking(start, end, roomId)
    return navigate(`/booking`)
  }

  return (
    <RootLayout>
      <div className="relative flex items-start justify-center -mt-4 w-full h-full overflow-hidden bg-[#CCB494] bg-no-repeat bg-cover">
          <video autoPlay loop muted className="fixed z-0 w-auto min-w-full min-h-full max-w-none">
              <source src={bgVideo} type="video/mp4" />
          </video>

        <div className="my-[25%] py-[40%] sm:py-[25%] md:py-[20%] lg:py-[10%] w-full max-w-xl h-fit max-h-max">
          <BookingDate
            startBooking={startBooking}
            endBooking={endBooking}
            roomBooking={roomAmount}
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
                      <Grid.Col>{room?.name}</Grid.Col>
                      <Grid.Col>{room?.pricePerNight} ฿</Grid.Col>
                      <Grid.Col>
                        <Flex gap="md" justify="center" direction="row" wrap="wrap">
                          <Button onClick={() => handleBooking(room.id)}>จองรอง</Button>
                        </Flex>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </Paper>
            )
          })}
        </div>
      </div>
    </RootLayout>
  )
}
