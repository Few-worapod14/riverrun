import * as apiRoom from '@/services/room'
import { Button, Container, Grid, Image, Overlay } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootLayout } from '../../components/Layout/Layout'

export default function RoomIndexPage() {
  const [rooms, setRooms] = useState<RoomDto[]>([])
  const [hoveredRoom, setHoveredRoom] = useState<RoomDto | null>(null)
  const navigate = useNavigate()

  const handleFetchRooms = async () => {
    const res = await apiRoom.getAllRooms()

    if (res.success) {
      setRooms(res.data)
    }
  }

  useEffect(() => {
    handleFetchRooms()
  }, [])

  const handleMouseEnter = (room: RoomDto) => {
    setHoveredRoom(room)
  }

  const handleMouseLeave = () => {
    setHoveredRoom(null)
  }

  return (
    <RootLayout>
      <Container>
        <h1>Our Room</h1>
        <Grid justify="space-between" align="flex-start">
          {rooms.map((room: RoomDto) => (
            <Grid.Col
              key={room.id}
              span={6}
              onMouseEnter={() => handleMouseEnter(room)}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative' }}
            >
              {room?.images?.length !== 0 ? (
                <Image src={room?.images?.[0].fullPath} radius="md" />
              ) : null}

              {hoveredRoom?.id === room.id && (
                <Overlay
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      color: '#fff'
                    }}
                  >
                    <h2>{room.name}</h2>
                    <p>{room.detail}</p>
                    <Button variant="light" onClick={() => navigate(`/room/${room.id}`)}>
                      ดูห้อง
                    </Button>
                  </div>
                </Overlay>
              )}
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </RootLayout>
  )
}
