import { RootLayout } from '@/components/Layout/Layout'
import * as apiBooking from '@/services/booking'
import * as apiPayment from '@/services/payment'
import * as apiRoom from '@/services/room'
import { useStore } from '@/store/store'
import { Button, Grid, Image, Input, Paper } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
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

  const init = {
    name: '',
    email: '',
    mobile: ''
  }

  const form = useForm({
    initialValues: init,
    validate: {
      name: isNotEmpty('กรุณากรอกชื่อ'),
      email: isEmail('กรุณากรอกอีเมล์'),
      mobile: isNotEmpty('กรุณากรอกเบอร์โทรศัพท์')
    }
  })

  const handleCheckBooking = () => {
    const currentTime = dayjs()
    const time5Min = dayjs(timeBooking).add(5, 'minute')
    const differenceInMinutes = currentTime?.isAfter(time5Min, 'minutes')
    if (!timeBooking || differenceInMinutes) {
      return navigate('/')
    }
  }

  const handleFetchRoom = async () => {
    const res = await apiRoom.getFilterRoom(roomId)

    if (res.success) {
      setRoom(res.data)
    }
  }

  const handleFetchPayment = async () => {
    const res = await apiPayment.getAll(1, 100)

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
            <Grid.Col span={6}>
              <Image radius="md" src={payment.fullPath} />
            </Grid.Col>
          </Grid>
          <hr />
        </>
      )
    })
  }

  const handleSetData = (type, value) => {
    const update = { ...data }
    update[type] = value
    setData(update)
  }

  const handleSubmit = async () => {
    form.validate()
    if (form.isValid()) {
      const res = await apiBooking.booking(data)

      if (res.success) {
        setSuccess(true)
      }
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
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col span={12}>
                    <Input
                      type="text"
                      placeholder="ชื่อ"
                      onChange={(e) => {
                        form.setFieldValue('name', e.target.value)
                        handleSetData('name', e.target.value)
                      }}
                      value={data.name}
                      error={form.errors.name}
                    />
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Input
                      placeholder="Email"
                      onChange={(e) => {
                        form.setFieldValue('email', e.target.value)
                        handleSetData('email', e.target.value)
                      }}
                      value={data.email}
                      error={form.errors.email}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Input
                      placeholder="เบอร์โทร"
                      onChange={(e) => {
                        form.setFieldValue('mobile', e.target.value)
                        handleSetData('mobile', e.target.value)
                      }}
                      value={data.mobile}
                      error={form.errors.mobile}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={12}>
                    <Button onClick={handleSubmit}>จอง</Button>
                  </Grid.Col>
                </Grid>
              </form>
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
