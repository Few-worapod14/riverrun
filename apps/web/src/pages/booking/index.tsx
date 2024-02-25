import { RootLayout } from '@/components/Layout/Layout'
import * as apiBooking from '@/services/booking'
import * as apiPayment from '@/services/payment'
import * as apiRoom from '@/services/room'
import { useStore } from '@/store/store'
import { Button, Grid, Image, Input, Paper } from '@mantine/core'
import { BookingCreateDto, PaymentDto, RoomDto } from '@riverrun/interface'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingPage() {
  const { roomId, timeBooking, startDate, endDate } = useStore()
  const navigate = useNavigate()

  const [room, setRoom] = useState<RoomDto>()
  const [data, setData] = useState<BookingCreateDto>({
    startBookingDate: startDate,
    endBookingDate: endDate,
    roomId: roomId,
    roomAmount: 1,
    adult: 1,
    children: 0,
    name: null,
    email: null,
    mobile: null
  })
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [payments, setPayments] = useState<PaymentDto[]>([])

  useEffect(() => {
    handleCheckBooking()
    handleFetchRoom()
    handleFetchPayment()
  }, [])

  const handleCheckBooking = () => {
    const currentTime = dayjs()
    const time5Min = dayjs(timeBooking).add(5, 'minute')
    const differenceInMinutes = currentTime?.isAfter(time5Min, 'minutes')
    if (!timeBooking || differenceInMinutes) {
      return navigate('/')
    }
  }

  const handleFetchRoom = async () => {
    console.log('-----', roomId)
    const res = await apiRoom.getFilterRoom(roomId)

    if (res.success) {
      setRoom(res.data)
    }
  }

  const handleFetchPayment = async () => {
    const res = await apiPayment.getAll(1, 20)

    if (res.success) {
      setPayments(res.data)
    }
  }

  const PaymentView = () => {
    return payments.map((payment) => {
      return (
        <>
          <Grid>
            <Grid.Col span={6}>ธนาคาร : {payment.bank}</Grid.Col>
            <Grid.Col span={6}>สาขา : {payment.branch}</Grid.Col>
            <Grid.Col span={6}>ชื่อบัญชี : {payment.name}</Grid.Col>
            <Grid.Col span={6}>เลขบัญชี : {payment.no}</Grid.Col>
          </Grid>
          <hr />
        </>
      )
    })
  }

  const handleSetData = (type, value) => {
    const update = data
    update[type] = value
    setData(update)
  }

  const handleSubmit = async () => {
    const res = await apiBooking.booking(data)

    if (res.success) {
      setSuccess(true)
    }
  }

  return (
    <RootLayout>
      {isSuccess ? (
        <Paper shadow="xs" p="xl">
          <h3>โอนเงินจองห้อง</h3>
          <PaymentView />
        </Paper>
      ) : (
        <Grid>
          <Grid.Col span={8}>
            <Paper shadow="xs" p="xl">
              <Grid>
                <Grid.Col span={12}>
                  <Input
                    placeholder="ชื่อ"
                    onChange={(e) => handleSetData('name', e.currentTarget.value)}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Input
                    placeholder="Email"
                    onChange={(e) => handleSetData('email', e.currentTarget.value)}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Input
                    placeholder="เบอร์โทร"
                    onChange={(e) => handleSetData('mobile', e.currentTarget.value)}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={12}>
                  <Button onClick={handleSubmit}>จอง</Button>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Paper shadow="xs" p="xl">
              <Grid>
                <Grid.Col span={12}>
                  วันที่จอง {dayjs(startDate).locale('th').format('DD MMM YYYY')} -{' '}
                  {dayjs(endDate).locale('th').format('DD MMM YYYY')}
                </Grid.Col>

                <Grid.Col>
                  <Grid>
                    <Grid.Col span={4}></Grid.Col>

                    <Grid.Col span={8}>
                      <Grid>
                        <Grid.Col span={12}>{room?.name}</Grid.Col>
                      </Grid>

                      {room?.images?.length > 0 ? (
                        <Grid>
                          <Grid.Col span={12}>
                            <Image src={room.images[0].fullPath} />
                          </Grid.Col>
                        </Grid>
                      ) : null}
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </RootLayout>
  )
}
