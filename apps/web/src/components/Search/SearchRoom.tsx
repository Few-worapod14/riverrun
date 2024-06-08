import { Button, Grid, NumberInput, Text, rem } from '@mantine/core'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import 'dayjs/locale/th'
import { useEffect } from 'react'

const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />

export const SearchRoom = ({ handleSetData, data, onSearch, setValue }) => {

  useEffect(() => {

  }, [data])

  return (
    <Grid className="card-bookingSearch">
      <Grid.Col span={{ md: 2, sm: 2, xs: 1 }}>
        <Text className="text-brown" size="lg" fw={500}>
          วันที่เข้าพัก
        </Text>
      </Grid.Col>
      <Grid.Col span={{ md: 10, sm: 10, xs: 1 }}>
        <DatesProvider settings={{ locale: 'th' }}>
          <DatePickerInput
            leftSection={icon}
            type="range"
            value={data.date}
            valueFormat={'dddd DD MMM'}
            onChange={(e) => {
              handleSetData('date', e)
              setValue(e)
            }}
          />
        </DatesProvider>
      </Grid.Col>
      <div className="justify-center items-center flex card-bookingSearch-1">
        <Grid.Col span={{ md: 2, sm: 2 }}>
          <Text className="text-brown " size="lg" fw={500}>
            จำนวนห้องพัก
          </Text>
        </Grid.Col>
        <Grid.Col span={{ md: 2, sm: 2 }}>
          <NumberInput
            placeholder=""
            value={data.roomAmount}
            min={0}
            max={30}
            onChange={(e) => {
              console.log(e)
              handleSetData('roomAmount', e)
            }}
          />
        </Grid.Col>
        <Grid.Col span={{ md: 1, sm: 1 }}>
          <Text className="text-brown lg:text-center sm:text-left" size="lg" fw={500}>
            ผู้ใหญ่
          </Text>
        </Grid.Col>
        <Grid.Col span={{ md: 2, sm: 2 }}>
          <NumberInput
            placeholder=""
            value={data.adult}
            min={0}
            max={20}
            onChange={(e) => {
              handleSetData('adult', e)
            }}
          />
        </Grid.Col>

        <Grid.Col span={{ md: 1, sm: 1 }}>
          <Text className="text-brown lg:text-center sm:text-left" size="lg" fw={500}>
            เด็ก
          </Text>
        </Grid.Col>
        <Grid.Col span={{ md: 2, sm: 2 }}>
          <NumberInput
            placeholder=""
            value={data.children}
            min={0}
            max={20}
            onChange={(e) => {
              handleSetData('children', e)
            }}
          />
        </Grid.Col>

        <Grid.Col span={{ md: 2, sm: 2 }}>
          <Button
            variant="filled"
            fullWidth
            onClick={onSearch}
            className="bg-orange text-egg-color btn-Search"
            fw={700}
          >
            ค้นหา
          </Button>
        </Grid.Col>
      </div>
    </Grid>
  )
}
