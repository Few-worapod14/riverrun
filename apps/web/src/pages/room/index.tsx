import { useEffect, useState } from 'react';
// import { RoomDto } from '@riverrun/interface';
import * as apiRoom from '@/services/room';
import { RootLayout } from '../../components/Layout/Layout';
import { Container, Grid, Image, Overlay, Button } from '@mantine/core';
import room1 from "../../assets/image1.jpg";

interface RoomDto {
  id: string;
  name: string;
  description: string;
}

const mockRooms: RoomDto[] = [
  {
    id: '1',
    name: 'Room A',
    description: 'This is Room A description.',
  },
  {
    id: '2',
    name: 'Room B',
    description: 'This is Room B description.',
  },
  {
    id: '3',
    name: 'Room C',
    description: 'This is Room C description.',
  },
];

export default function RoomIndexPage() {
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [hoveredRoom, setHoveredRoom] = useState<RoomDto | null>(null);

  const handleFetchRooms = async () => {
    const res = await apiRoom.getAllRooms();

    if (res.success) {
      // setRooms(res.data)
    }
  };

  useEffect(() => {
    handleFetchRooms();
  }, []);

  const handleMouseEnter = (room: RoomDto) => {
    setHoveredRoom(room);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  return (
    <RootLayout>
      {/* {rooms.map((room: RoomDto, i) => {
        if (i % 2 === 0) {
          return <RoomA data={room} />
        } else {
          return <RoomB data={room} />
        }
      })} */}
      <Container>
        <h1>Our Room</h1>
        <Grid justify="space-between" align="flex-start">
          {mockRooms.map((room: RoomDto) => (
            <Grid.Col
              key={room.id}
              span={6}
              onMouseEnter={() => handleMouseEnter(room)}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative' }}
            >
              <Image src={room1} radius="md" />
              {hoveredRoom?.id === room.id && (
                <Overlay
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
                    <h2>{room.name}</h2>
                    <p>{room.description}</p>
                    <Button component="a" href={`/room/cottage`} variant="light">Check availability</Button>
                  </div>
                </Overlay>
              )}
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </RootLayout>
  );
}
