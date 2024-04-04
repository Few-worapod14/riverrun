import { RootLayout } from '@/components/Layout/Layout'
import { ModalBox } from '@/components/Modal/Modal'
import { PaymentView } from '@/components/Payment/PaymentView'
import * as apiBooking from '@/services/booking'
import * as apiPayment from '@/services/payment'
import * as apiRoom from '@/services/room'
import { useStore } from '@/store/store'
import { Button, Grid, Image, Input, Paper, Select, Textarea } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import {
  BookingCreateDto,
  IErrorDto,
  IErrorMessage,
  PaymentDto,
  RoomDto
} from '@riverrun/interface'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingPage() {
  const { roomId, timeBooking, startDate, endDate } = useStore()
  const navigate = useNavigate()

  const [isError, setError] = useState(false)
  const [errMsg, setErrMsg] = useState<IErrorMessage[]>([])

  const [room, setRoom] = useState<RoomDto>()
  const [data, setData] = useState<BookingCreateDto>({
    startBookingDate: dayjs(startDate).format('YYYY-MM-DD'),
    endBookingDate: dayjs(endDate).format('YYYY-MM-DD'),
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
    mobile: '',
    adult: 1,
    children: 0,
    note: null
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
      } else {
        const err = res as IErrorDto
        setError(true)
        setSuccess(false)
        setErrMsg(err.message)
      }
    }
  }

  return (
    <RootLayout>
      {isSuccess ? (
        <Paper shadow="xs" p="xl">
          <h3>รายละเอียดโอนเงินจองห้อง</h3>
          <PaymentView payments={payments} />
        </Paper>
      ) : (
        <>
          <Grid>
            <Grid.Col span={8}>
              <Paper shadow="xs" p="xl">
                <form onSubmit={handleSubmit}>
                  <h3>ข้อมูลผู้เข้าพัก</h3>
                  <Grid>
                    <Grid.Col span={12}>
                      <Input.Wrapper label="ชื่อ">
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
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={6}>
                      <Input.Wrapper label="Email">
                        <Input
                          placeholder="Email"
                          onChange={(e) => {
                            form.setFieldValue('email', e.target.value)
                            handleSetData('email', e.target.value)
                          }}
                          value={data.email}
                          error={form.errors.email}
                        />
                      </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <Input.Wrapper label="เบอร์โทร">
                        <Input
                          placeholder="เบอร์โทร"
                          onChange={(e) => {
                            form.setFieldValue('mobile', e.target.value)
                            handleSetData('mobile', e.target.value)
                          }}
                          value={data.mobile}
                          error={form.errors.mobile}
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={3}>
                      <Select
                        label="ผู้ใหญ่"
                        placeholder="ผู้ใหญ่"
                        defaultValue="1"
                        data={['1', '2', '3', '4', '5']}
                        onChange={(_value, option) => {
                          form.setFieldValue('adult', Number(option.value))
                          handleSetData('adult', Number(option.value))
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Select
                        label="เด็ก"
                        placeholder="เด็ก"
                        defaultValue="0"
                        data={['0', '1', '2', '3', '4', '5']}
                        onChange={(_value, option) => {
                          form.setFieldValue('children', Number(option.value))
                          handleSetData('children', Number(option.value))
                        }}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={12}>
                      <Textarea
                        label="หมาเหตุ"
                        placeholder="หมาเหตุ"
                        onChange={(e) => {
                          form.setFieldValue('note', e.target.value)
                          handleSetData('note', e.target.value)
                        }}
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
                      <Grid.Col span={12}>
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

          <ModalBox title="Error" isOpen={isError} onClose={() => setError(false)}>
            {errMsg.map((x) => {
              return <p>{x.message}</p>
            })}
          </ModalBox>
        </>
      )}
    </RootLayout>
  )
}
