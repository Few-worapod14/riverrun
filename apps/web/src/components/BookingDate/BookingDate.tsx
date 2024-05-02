import { Button, Grid, NumberInput, Paper } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState } from 'react'

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
}

export const BookingDate = ({ onSearch, startBooking, endBooking, roomBooking }: Props) => {
  const [startDate, setStartDate] = useState<string | null>(startBooking || null)
  const [endDate, setEndDate] = useState<string | null>(endBooking || null)
  const [room, setRoom] = useState(roomBooking || 1)

  const handleSearch = () => {
    onSearch({
      startDate: startDate,
      endDate: endDate,
      room: room
    })
  }

  return (
    <Paper shadow="xs" p="xl">
      <Grid justify="center" align="flex-end">
        <Grid.Col span={6}>
          <DatePickerInput
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
          />
        </Grid.Col>

        <Grid.Col span={2}>
          <NumberInput
            label="จำนวนห้อง"
            onChange={(value) => setRoom(Number(value))}
            defaultValue={room}
          />
        </Grid.Col>

        <Grid.Col span={2}>
          <Button w={'100%'} onClick={handleSearch}>
            ค้นหา
          </Button>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
