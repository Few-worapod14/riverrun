import * as apiRoom from '@/services/room'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootLayout } from '../../components/Layout/Layout'

export default function RoomViewPage() {
  const { slug } = useParams()

  const [room, setRoom] = useState([])

  useEffect(() => {
    handleFetchRooms()
  }, [])

  const handleFetchRooms = async () => {
    const res = await apiRoom.getRoomById(slug)

    if (res.success) {
      setRoom(res.data)
    }
  }

  return <RootLayout>xx</RootLayout>
}
