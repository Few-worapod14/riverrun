import { BookingDate } from '@/components/BookingDate/BookingDate'
import { RootLayout } from '@/components/Layout/Layout'
import * as api from '@/services/booking'
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
      <BookingDate
        startBooking={startBooking}
        endBooking={endBooking}
        roomBooking={roomBooking}
        onSearch={handleSearch}
      />

      <>
        {rooms.map((room) => {
          return <>{room.name}</>
        })}
      </>
    </RootLayout>
  )
}
