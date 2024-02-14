import { RootLayout } from '@/components/Layout/Layout'
import { Button, Grid, NumberInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function BookingPage() {
  const [searchParams] = useSearchParams()

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  const initData = {
    adult: 1,
    child: 0
  }

  const form = useForm({
    initialValues: initData
  })

  useEffect(() => {}, [])

  return (
    <RootLayout>
      <Grid>
        <Grid.Col span={6}>
          <DatePickerInput type="range" value={value} onChange={setValue} />
        </Grid.Col>

        <Grid.Col span={2}>
          <NumberInput {...form.getInputProps('adult')} />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput {...form.getInputProps('child')} />
        </Grid.Col>

        <Grid.Col span={2}>
          <Button>ค้นหา</Button>
        </Grid.Col>
      </Grid>
    </RootLayout>
  )
}
