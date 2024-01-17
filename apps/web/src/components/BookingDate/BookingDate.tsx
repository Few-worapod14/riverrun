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

      <div className='justify-between items-center gap-4 bg-white p-4 rounded-2xl md:hidden lg:flex'>
        <p className='text-2xl font-extrabold'>Book Now</p>
        <DateInput
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'month').toDate()}
          label="Check In"
          placeholder="mm/dd/yyyy"
          onChange={handleBooking}
          className='my-2'
        />
        <DateInput
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'month').toDate()}
          label="Check Out"
          placeholder="mm/dd/yyyy"
          onChange={handleBooking}
          className='my-2'
        />
        <Select
          label="Guests"
          placeholder="1"
          data={['1', '2', '3', '4']}
          defaultValue="React"
          className='lg:w-[56px] my-2'

        />
        <Button variant="filled" color="teal" size="xl" className='my-2'>BOOK NOW</Button>
      </div>
    </>
  )
}
