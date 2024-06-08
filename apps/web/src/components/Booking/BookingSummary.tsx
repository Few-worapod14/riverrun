import { Button, Divider, Grid, Paper } from '@mantine/core'

import { Text } from '@mantine/core'

import dayjs from 'dayjs'

import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { useEffect, useMemo } from 'react'

import { isEmpty, isNull } from 'lodash'

export const DateShortTH = (date) => {
  const dayJSTH = dayjs
  dayJSTH.extend(buddhistEra)
  dayJSTH.locale('th')
  return dayJSTH(date).format('dddd DD MMM BBBB')
}

export const BookingSummary = ({ data, room, onSubmit, ...props }) => {
  const { style } = props
  const dateDiff = (start, end) => {
    return dayjs(end).diff(start, 'd')
  }

  const calculateCost = useMemo(()=>{

    return (room?.pricePerNight * data?.roomAmount * (data?.days || dateDiff(data?.startBookingDate, data?.endBookingDate)))
  },[room?.pricePerNight,data?.days,data?.roomAmount,data?.startBookingDate, data?.endBookingDate])

  useEffect(() => {

  }, [room, data])

  return (
    <Paper shadow="xs" p="xl" style={{ backgroundColor: '#E4B7A0', ...style }}>
      <Text fz={20} fw={400}>
        รายละเอียดการจอง
      </Text>

      <Grid>
        <Grid.Col span={data?.name ? 6 : 12}>
          <Text fz={14} fw={300} color="#424242" mt="sm">
            เช็คอิน
          </Text>
          <Text fz={14} fw={500}>
            {DateShortTH(data.startBookingDate)}
          </Text>
        </Grid.Col>
        {!isNull(data?.name) && (
          <Grid.Col span={6}>
            <Text fz={14} fw={300} color="#424242" mt="sm">
              ชื่อ-นามกกุล
            </Text>
            <Text fz={14} fw={500}>
              {data?.name}
            </Text>
          </Grid.Col>
        )}
        <Grid.Col span={data?.mobile ? 6 : 12}>
          <Text fz={14} fw={300} color="#424242" mt="sm">
            เช็คเอาท์
          </Text>
          <Text fz={14} fw={500}>
            {DateShortTH(data.endBookingDate)}
          </Text>
        </Grid.Col>
        {!isNull(data?.mobile) && (
          <Grid.Col span={6}>
            <Text fz={14} fw={300} color="#424242" mt="sm">
              เบอร์โทร
            </Text>
            <Text fz={14} fw={500}>
              {data?.mobile}
            </Text>
          </Grid.Col>
        )}

        <Grid.Col span={12}>
          <Text fz={14} fw={300} color="#424242" mt="sm">
            ระยะเวลาเข้าพักทั้งหมด:{' '}
            {data?.days || dateDiff(data?.startBookingDate, data?.endBookingDate)} คืน
          </Text>
        </Grid.Col>

        <Grid.Col span={data?.email ? 6 : 12}>
          <Text fz={14} fw={300} color="#424242" mt="md">
            ห้องพักของคุณ: <span className=" text-black font-medium">{data?.roomAmount} ห้อง</span>
          </Text>{' '}
        </Grid.Col>
        {!isNull(data?.email) && (
          <Grid.Col span={6}>
            <Text fz={14} fw={300} color="#424242" mt="md">
              อีเมล: <span className=" text-black font-medium">{data?.email}</span>
            </Text>
          </Grid.Col>
        )}
      </Grid>
      <Text fz={14} fw={500}>
        {room?.name}
      </Text>

      <Divider mt="md" mb="md" color="#000" />
      {isEmpty(room) && (
        <Text mt="sm" fz={12} fw={500} color="red">
          ยังไม่ได้เลือกห้องพัก
        </Text>
      )}
      {props?.isPayment && (
        <Text mt="sm" fz={16} fw={500}>
          หมายเลขการจอง #{data?.id}
        </Text>
      )}
      <Grid align="center">
        <Grid.Col span={4}>
          <Text fz={14} fw={500} color="#424242">
            ราคา
          </Text>
        </Grid.Col>
        <Grid.Col span={8} className="flex justify-end">
          <Text fz={28} fw={600}>
            {isNaN(calculateCost) ? 0 : calculateCost.toLocaleString()}
            <span className="ml-2" style={{ fontSize: 14, color: '#424242' }}>
              บาท
            </span>
          </Text>
        </Grid.Col>
      </Grid>

      {onSubmit && (
        <div className="mt-4 flex items-center justify-center flex-col">
          <Button
            disabled={room?.id == 0}
            size="lg"
            style={{ width: '80%' }}
            color="#C38370"
            onClick={onSubmit}
          >
            <span style={{ color: room?.id == 0 ? '#adb5bd' : '#F6EEE0' }}>ยืนยันการจอง</span>
          </Button>
        </div>
      )}
    </Paper>
  )
}
