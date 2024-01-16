import { DateInput, DateValue } from '@mantine/dates'
import { useState } from 'react'
import dayjs from 'dayjs';

export const BookingDate = () => {
  const [booking, setBooking] = useState(null)

  const handleBooking = (value: DateValue) => {
    setBooking(value)
  }

  return (
    <>
      {/* <DateInput onChange={handleBooking} /> */}
      <DateInput
      minDate={new Date()}
      maxDate={dayjs(new Date()).add(1, 'month').toDate()}
      label="Date input"
      placeholder="Date input"
      onChange={handleBooking}
    />
    </>
  )
}
