import { Button, Grid, NumberInput, Paper } from '@mantine/core'
import { DatePickerInput, DateInput} from '@mantine/dates'
import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState } from 'react'
import { IconCalendar, IconChevronDown, IconUser } from '@tabler/icons-react';


dayjs.locale(th)
dayjs.extend(customParseFormat)

type Props = {
  onSearch: ({
    startDate,
    endDate,
    room
  }: {
    startDate: string
    endDate: string
    room: number
  }) => void
  startBooking?: string
  endBooking?: string
  roomBooking?: number
  guestBooking?: number
  kidsBooking?: number
}

export const BookingDate = ({ onSearch, startBooking, endBooking, roomBooking, guestBooking, kidsBooking }: Props) => {
  // const [startDate, setStartDate] = useState<string | null>(startBooking || null)
  // const [endDate, setEndDate] = useState<string | null>(endBooking || null)
  const [room, setRoom] = useState(roomBooking || 1)
  const [guest, setGuest] = useState(guestBooking || 1)
  const [kids, setKids] = useState(kidsBooking || 1)
  const [startDate, setStartDate] = useState<string | null>(startBooking || null);
  const [endDate, setEndDate] = useState<string | null>(endBooking || null);


  const handleSearch = () => {
    onSearch({
      startDate: startDate,
      endDate: endDate,
      room: room
    })
  }

  return (
      <Paper shadow="xs" p="xl" className="absolute top-[30%] inset-0 w-auto min-w-full h-auto min-h-full opacity-75 bg-[#CCB494] max-w-none rounded-md">
        <Grid justify="center" align="flex-end">
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            {/* <DatePickerInput
              label="วันจอง"
              minDate={new Date()}
              type="range"
              value={[
                startDate ? dayjs(startDate, 'DD-MM-YYYY')?.toDate() : null,
                endDate ? dayjs(endDate, 'DD-MM-YYYY')?.toDate() : null
              ]}
              onChange={(value) => {
                value[0] ? setStartDate(dayjs(value?.[0]).format('DD-MM-YYYY')) : null
                value[1] ? setEndDate(dayjs(value?.[1]).format('DD-MM-YYYY')) : null
              }}
            /> */}
            <DateInput
              value={startDate ? dayjs(startDate, 'DD-MM-YYYY')?.toDate() : null}
              onChange={(value) => {
                value ? setStartDate(dayjs(value).format('DD-MM-YYYY')) : setStartDate(null);
              }}
              label="Check in"
              placeholder="Date Arrival"
              rightSection={<IconCalendar/>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <DateInput
              value={endDate ? dayjs(endDate, 'DD-MM-YYYY')?.toDate() : null}
              onChange={(value) => {
                value ? setEndDate(dayjs(value).format('DD-MM-YYYY')) : setEndDate(null);
              }}
              label="Check out"
              placeholder="Date Departure"
              rightSection={<IconCalendar/>}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 2, lg: 1 }}>
            <NumberInput
              label="Guest"
              onChange={(value) => setGuest(Number(value))}
              defaultValue={room}
              rightSection={<IconUser/>}
              style={{ '& label': { color: 'red' } }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2, lg: 1 }}>
            <NumberInput
              label="Kids"
              onChange={(value) => setKids(Number(value))}
              defaultValue={room}
              rightSection={<IconUser/>}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2, lg: 1 }}>
            <NumberInput
              label="Room"
              onChange={(value) => setRoom(Number(value))}
              defaultValue={room}
              rightSection={<IconUser/>}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Button color='#A16207' w={'100%'} onClick={handleSearch}>
              Check availability
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>
  )
}
