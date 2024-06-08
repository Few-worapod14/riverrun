import { RootLayout } from '@/components/Layout/Layout'
import { ModalBox } from '@/components/Modal/Modal'
import * as apiPayment from '@/services/payment'
// import * as apiRoom from '@/services/room'
import { useStore } from '@/store/store'
import { Button, Grid, Input, Paper, Text, Textarea } from '@mantine/core'

import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { BookingCreateDto, IErrorMessage, PaymentDto, RoomDto } from '@riverrun/interface'
import dayjs from 'dayjs'

import 'dayjs/locale/th'

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  IconArrowLeft,
  IconBath,
  IconBed,
  IconFridge,
  IconNote,
  IconToiletPaper
} from '@tabler/icons-react'

import { BookingSummary } from '@/components/Booking/BookingSummary'
import { RoomCard } from '@/components/Booking/RoomCard'
import { SearchRoom } from '@/components/Search/SearchRoom'
import axios from 'axios'
import queryString from 'query-string'

const ObjectIcon = {
  ห้องอาบน้ำ: <IconBath stroke={1.5} />,
  ห้องครัว: <IconFridge />,
  ห้องน้ำ: <IconToiletPaper />,
  ห้องนอน: <IconBed />,
  ทั่วไป: <IconNote />
}

const MOCKUP_ROOM = [ //TODO: stucture ข้อมูลห้อง
  {
    id: 1,
    name: 'ห้องเตียงใหญ่หรือเตียงแฝดพร้อมห้องน้ำที่ใช้ร่วมกัน',
    pricePerNight: 2000,
    amount: 2,
    available: 5,
    detail: '',
    isActive: true,
    createdAt: '2024-05-02T23:08:39.965Z',
    updatedAt: '2024-05-04T08:15:48.029Z',
    category: {
      id: 1,
      name: 'ทั่วไป',
      isActive: true
    },
    images: [
      {
        id: 6,
        fileName: '1714770043697-7q7wyi-IMG_7662.JPG',
        path: '_uploads/1714770043697-7q7wyi-IMG_7662.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714770043697-7q7wyi-IMG_7662.JPG'
      },
      {
        id: 7,
        fileName: '1714846571225-u4b5u8-IMG_7665.JPG',
        path: '_uploads/1714846571225-u4b5u8-IMG_7665.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714846571225-u4b5u8-IMG_7665.JPG'
      },
      {
        id: 8,
        fileName: '1714848294397-btews-IMG_9985.JPG',
        path: '_uploads/1714848294397-btews-IMG_9985.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714848294397-btews-IMG_9985.JPG'
      }
    ],
    amenities: [
      { name: 'ห้องอาบน้ำ', lists: [{ name: 'ฝักบัว' }] },
      {
        name: 'ห้องครัว',
        lists: [
          {
            name: 'เตาไฟฟ้า'
          },
          {
            name: 'ไมโครเวฟ'
          },
          {
            name: 'ตู้เย็น'
          }
        ]
      },
      {
        name: 'ห้องนอน',
        lists: [
          {
            name: 'เตียงควีนไซส์'
          },
          {
            name: 'เตียงโซฟาเบด'
          },
          {
            name: 'โซฟา'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'เคบิน (Cabin)',
    pricePerNight: 3500,
    amount: 2,
    available: 5,
    detail: '',
    isActive: true,
    createdAt: '2024-05-02T23:08:39.965Z',
    updatedAt: '2024-05-04T08:15:48.029Z',
    category: {
      id: 1,
      name: 'ทั่วไป',
      isActive: true
    },
    images: [
      {
        id: 6,
        fileName: '1714770043697-7q7wyi-IMG_7662.JPG',
        path: '_uploads/1714770043697-7q7wyi-IMG_7662.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714770043697-7q7wyi-IMG_7662.JPG'
      },
      {
        id: 7,
        fileName: '1714846571225-u4b5u8-IMG_7665.JPG',
        path: '_uploads/1714846571225-u4b5u8-IMG_7665.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714846571225-u4b5u8-IMG_7665.JPG'
      },
      {
        id: 8,
        fileName: '1714848294397-btews-IMG_9985.JPG',
        path: '_uploads/1714848294397-btews-IMG_9985.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714848294397-btews-IMG_9985.JPG'
      }
    ],
    amenities: [
      { name: 'ห้องอาบน้ำ', lists: [{ name: 'ฝักบัว' }] },
      {
        name: 'ห้องครัว',
        lists: [
          {
            name: 'เตาไฟฟ้า'
          },
          {
            name: 'ไมโครเวฟ'
          },
          {
            name: 'ตู้เย็น'
          }
        ]
      },
      {
        name: 'ห้องนอน',
        lists: [
          {
            name: 'เตียงควีนไซส์'
          },
          {
            name: 'เตียงโซฟาเบด'
          },
          {
            name: 'โซฟา'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'คอตเทจ (Cottage)',
    pricePerNight: 4000,
    amount: 4,
    available: 5,
    detail: '2 เตียงเดี่ยวและ 1 เตียงควีนไซส์',
    isActive: true,
    createdAt: '2024-05-02T23:08:39.965Z',
    updatedAt: '2024-05-04T08:15:48.029Z',
    category: {
      id: 1,
      name: 'ทั่วไป',
      isActive: true
    },
    images: [
      {
        id: 6,
        fileName: '1714770043697-7q7wyi-IMG_7662.JPG',
        path: '_uploads/1714770043697-7q7wyi-IMG_7662.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714770043697-7q7wyi-IMG_7662.JPG'
      },
      {
        id: 7,
        fileName: '1714846571225-u4b5u8-IMG_7665.JPG',
        path: '_uploads/1714846571225-u4b5u8-IMG_7665.JPG',
        fullPath: 'http://dev.zlalabs.com/api/_uploads/1714846571225-u4b5u8-IMG_7665.JPG'
      }
    ],
    amenities: [
      { name: 'ห้องอาบน้ำ', lists: [{ name: 'ฝักบัว' }] },
      {
        name: 'ห้องครัว',
        lists: [
          {
            name: 'เตาไฟฟ้า'
          },
          {
            name: 'ไมโครเวฟ'
          },
          {
            name: 'ตู้เย็น'
          }
        ]
      },
      {
        name: 'ห้องนอน',
        lists: [
          {
            name: 'เตียงควีนไซส์'
          },
          {
            name: 'เตียงโซฟาเบด'
          },
          {
            name: 'โซฟา'
          }
        ]
      }
    ]
  }
]

const init = {
  name: '',
  email: '',
  mobile: '',
  adult: 1,
  children: 0,
  note: null
}

export default function BookingPage() {
  const { roomId, timeBooking, startDate, endDate } = useStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isError, setError] = useState(false)
  const [errMsg, setErrMsg] = useState<IErrorMessage[]>([])
  const [room, setRoom] = useState<RoomDto>()
  const [roomList , setRoomList] =useState<RoomDto[]>()

  /* Search Room props */
  const today = new Date()
  const tmr = new Date()
  tmr.setDate(today.getDate() + 1)
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(searchParams.get('startBookingDate') || today),
    new Date(searchParams.get('endBookingDate') || tmr)
  ])

  const [data, setData] = useState<BookingCreateDto>({
    date: value,
    roomId: roomId,
    name: null,
    email: null,
    mobile: null,
    startBookingDate: dayjs(value?.[0]).format('YYYY-MM-DD'),
    endBookingDate: dayjs(value?.[1]).format('YYYY-MM-DD'),
    roomAmount: Number(searchParams.get('roomAmount')) || 1,
    adult: Number(searchParams.get('adult')) || 2,
    children: Number(searchParams.get('children')) || 0
  })
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [payments, setPayments] = useState<PaymentDto[]>([])
  const [_room, _setRoom] = useState({ id: 0 })

  useEffect(() => {
    // handleCheckBooking()
    handleFetchRoom()
    // handleFetchPayment()
  }, [searchParams])

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
    setRoomList(MOCKUP_ROOM)

    //TODO: fetchroom ที่ว่าง ในวันที่ ส่งการค้นหามา https://dev.zlalabs.com/api/v1/rooms?page=1&limit=5
    // const res =  await apiRoom.getAllRooms()
    // if (res.success) {
    //   setRoomList(res.data)
    // }

    // const res = await apiRoom.getFilterRoom(roomId)
    // if (res.success) {
    //   setRoom(res.data)
    // }
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
      //TODO: API BOOKING
      // const res = await apiBooking.booking(data)

      // if (res.success) {
      //    navigate(`/payment?id=${res.data.data.id}`)
      // } else {
      //   const err = res as IErrorDto
      //   setError(true)
      //   setErrMsg(err.message)
      // }

      try {
        const res = await axios.post(`https://dev.zlalabs.com/api/v1/bookings`, data)
        if (res.data) {
          navigate(`/payment?id=${res.data.data.id}`)
        }
      } catch (err) {}
    }
  }

  const handleRoomBooking = (roomDetail) => {
    _setRoom(roomDetail)
  }

  const handleBooking = (_data) => {
    setSuccess(true)
    setData({ ...data, roomId: _room?.id })
  }

  const onBack = () => {
    setSuccess(false)
  }

  const onSearch = async () => {
    const datasearch = {
      ...data,
      startBookingDate: dayjs(data?.date?.[0]).format('YYYY-MM-DD'),
      endBookingDate: dayjs(data?.date?.[1]).format('YYYY-MM-DD')
    }
    setData(datasearch)

    const tmpquery = { ...datasearch }
    delete tmpquery.date
    const query = queryString.stringify(tmpquery, {
      skipNull: true
    })

    return navigate(`/booking?${query}`)
  }

  return (
    <RootLayout>
      {isSuccess ? (
        // <Paper shadow="xs" p="xl">
        //   <h3>รายละเอียดโอนเงินจองห้อง</h3>
        //   <PaymentView payments={payments} />
        // </Paper>
        <Paper p="md" className="mt-4">
          <div className='mb-2'>
            <Button
              type="button"
              onClick={onBack}
              color="#F59475"
              leftSection={<IconArrowLeft color="#F6EEE0" />}
            >
              <span style={{ color: '#F6EEE0' }}>Back</span>
            </Button>
          </div>
          <BookingSummary
            {...{ data, room: _room }}
            onSubmit={false}
            style={{ backgroundColor: '#F5F5F5' }}
          />
          <Paper p="md" mt="md" style={{ backgroundColor: '#F5F5F5' }}>
            <form onSubmit={handleSubmit}>
              <Text fz={14} fw={500}>
                กรุณากรอกข้อมูลของท่าน
              </Text>

              <Grid>
                <Grid.Col span={12}>
                  <Input.Wrapper label="ชื่อ-นามสกุล">
                    <Input
                      type="text"
                      placeholder="ชื่อ-นามสกุล"
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
                <Grid.Col span={6}>
                  <Input.Wrapper label="อีเมล">
                    <Input
                      placeholder="example@ex.com"
                      onChange={(e) => {
                        form.setFieldValue('email', e.target.value)
                        handleSetData('email', e.target.value)
                      }}
                      value={data.email}
                      error={form.errors.email}
                    />
                  </Input.Wrapper>
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={12}>
                  <Textarea
                    label="หมายเหตุ"
                    placeholder="หมายเหตุ"
                    onChange={(e) => {
                      form.setFieldValue('note', e.target.value)
                      handleSetData('note', e.target.value)
                    }}
                  />
                </Grid.Col>
              </Grid>

              <div className="mt-4 flex items-center justify-center flex-col">
                {/* <Button onClick={handleSubmit}>จอง</Button> */}

                <Button onClick={handleSubmit} size="lg" style={{ width: '80%' }} color="#C38370">
                  <span style={{ color: '#fff' }}>ชำระเงิน</span>
                </Button>
              </div>
            </form>
          </Paper>
        </Paper>
      ) : (
        <>
          <SearchRoom {...{ handleSetData, data, onSearch, setValue }} />
          <Grid className="mt-4">
            <Grid.Col span={{ sm: 12, md: 8 }}>
              <Paper p="md" style={{ backgroundColor: '#FFF' }}>
                {roomList?.map((room) => (
                  <RoomCard detail={room} handleRoomBooking={handleRoomBooking} selected={_room} />
                ))}
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ sm: 12, md: 4 }}>
              <BookingSummary {...{ data, room: _room }} onSubmit={handleBooking} />
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
