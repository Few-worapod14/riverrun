import { DateInput, DateValue } from '@mantine/dates'
import { useState } from 'react'

export const BookingDate = () => {
  const [booking, setBooking] = useState(null)

  const handleBooking = (value: DateValue) => {
    setBooking(value)
  }

  return (
    <>
      <DateInput onChange={handleBooking} />
    </>
  )
}
