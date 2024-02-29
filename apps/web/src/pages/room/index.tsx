import { RoomA } from '@/components/Room/RoomA'
import { RoomB } from '@/components/Room/RoomB'
import * as apiRoom from '@/services/room'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { RootLayout } from '../../components/Layout/Layout'

export default function RoomIndexPage() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    handleFetchRooms()
  }, [])

  const handleFetchRooms = async () => {
    const res = await apiRoom.getAllRooms()

    if (res.success) {
      setRooms(res.data)
    }
  }

  return (
    <RootLayout>
      {rooms.map((room: RoomDto, i) => {
        if (i % 2 === 0) {
          return <RoomA data={room} />
        } else {
          return <RoomB data={room} />
        }
      })}
    </RootLayout>
  )
}
