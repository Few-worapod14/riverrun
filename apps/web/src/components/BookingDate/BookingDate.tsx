import { DateInput, DateValue } from '@mantine/dates'
import { Select, Button } from '@mantine/core';
import { useState } from 'react'
import dayjs from 'dayjs';

export const BookingDate = () => {
  const [booking, setBooking] = useState(null)

  const handleBooking = (value: DateValue) => {
    setBooking(value)
  }

  return (
    <>

      <div className='flex justify-between items-center gap-4 bg-white p-4 rounded-2xl'>
        <p className='text-2xl font-extrabold'>Book Now</p>
        <DateInput
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'month').toDate()}
          label="Check In"
          placeholder="mm/dd/yyyy"
          onChange={handleBooking}
        />
        <DateInput
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'month').toDate()}
          label="Check Out"
          placeholder="mm/dd/yyyy"
          onChange={handleBooking}
        />
        <Select
          label="Guests"
          placeholder="1"
          data={['1', '2', '3', '4']}
          defaultValue="React"
          className='w-[56px]'
        />
        <Button variant="filled" color="teal" size="xl" >BOOK NOW</Button>
      </div>
    </>
  )
}
