import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminBooking from '@/services/admin-booking'
import { BOOKING_STATUS } from '@/utils/booking'
import { Button, Flex, Grid, LoadingOverlay, Paper, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { BookingDto } from '@riverrun/interface'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminBookingEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [booking, setBooking] = useState<BookingDto>(null)

  const initData = {
    ...booking
  }

  const form = useForm({
    initialValues: initData
  })

  useEffect(() => {
    handleGetById()
  }, [])

  const handleGetById = async () => {
    const res = await adminBooking.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setBooking(res.data!)
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    form.validate()
    if (form.isValid()) {
      const data = form.values
      const res = await adminBooking.update(Number(id), data)
      if (res.success) {
        navigate('/admin/booking')
      }
    }
  }

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <h3>ข้อมูลการจองห้อง</h3>

          <Paper shadow="xs" p="xl">
            <form onSubmit={handleUpdate}>
              <Grid className="mb-5">
                <Grid.Col span={3}>ห้องพัก :</Grid.Col>
                <Grid.Col span={9}>{booking?.room?.name}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>วันเข้าพัก : </Grid.Col>
                <Grid.Col span={9}>
                  {booking?.startBookingDate
                    ? dayjs(booking?.startBookingDate).format('DD/MM/YYYY')
                    : null}{' '}
                  -{' '}
                  {booking?.endBookingDate
                    ? dayjs(booking?.endBookingDate).format('DD/MM/YYYY')
                    : null}
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>วันเช็คอิน :</Grid.Col>
                <Grid.Col span={9}>
                  {booking?.checkInDate
                    ? dayjs(booking?.checkInDate).format('DD/MM/YYYY HH:mm:ss')
                    : null}
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>เช็คเอาต์ :</Grid.Col>
                <Grid.Col span={9}>
                  {booking?.checkOutDate
                    ? dayjs(booking?.checkOutDate).format('DD/MM/YYYY HH:mm:ss')
                    : null}
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>ลูกค้า :</Grid.Col>
                <Grid.Col span={9}>
                  {!booking?.customer
                    ? `${booking?.name}`
                    : `${booking?.customer?.firstName} - ${booking?.customer?.lastName}`}
                </Grid.Col>
              </Grid>

              {booking?.mobile ? (
                <Grid className="mb-5">
                  <Grid.Col span={3}>เบอร์โทรศัพท์ :</Grid.Col>
                  <Grid.Col span={9}>{booking?.mobile}</Grid.Col>
                </Grid>
              ) : null}

              {booking?.email ? (
                <Grid className="mb-5">
                  <Grid.Col span={3}>อีิเมล์ :</Grid.Col>
                  <Grid.Col span={9}>{booking?.email}</Grid.Col>
                </Grid>
              ) : null}

              {/* <Grid className="mb-5">
            <Grid.Col span={3}>ผู้ใหญ่ :</Grid.Col>
            <Grid.Col span={9}>{booking?.adult}</Grid.Col>
          </Grid>
          <Grid className="mb-5">
            <Grid.Col span={3}>เด็ก :</Grid.Col>
            <Grid.Col span={9}>{booking?.children}</Grid.Col>
          </Grid>
          <Grid className="mb-5">
            <Grid.Col span={3}>ส่วนลด :</Grid.Col>
            <Grid.Col span={9}>{booking?.discount}</Grid.Col>
          </Grid>

          <Grid className="mb-5">
            <Grid.Col span={3}>รวม :</Grid.Col>
            <Grid.Col span={9}>{booking?.total}</Grid.Col>
          </Grid> */}

              <Grid className="mb-5">
                <Grid.Col span={3}>ราคาห้อง :</Grid.Col>
                <Grid.Col span={9}>{booking?.totalAmount}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>หมายเหตุ :</Grid.Col>
                <Grid.Col span={9}>{booking?.note}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>สถานะ :</Grid.Col>

                <Grid.Col span={9}>
                  <Select
                    data={[
                      {
                        label: 'จอง',
                        value: BOOKING_STATUS.BOOKING
                      },
                      {
                        label: 'จ่ายเงินเรียบร้อย',
                        value: BOOKING_STATUS.PAID
                      },
                      {
                        label: 'เช็คเอ้าท์แล้ว',
                        value: BOOKING_STATUS.DONE
                      },
                      {
                        label: 'ยกเลิก',
                        value: BOOKING_STATUS.CANCEL
                      }
                    ]}
                    defaultValue={booking?.status}
                    {...form.getInputProps('status')}
                  />
                </Grid.Col>
              </Grid>

              <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                <Button
                  onClick={() => {
                    navigate('/admin/booking')
                  }}
                >
                  กลับ
                </Button>

                <Button color="green" type="submit">
                  บันทึก
                </Button>
              </Flex>
            </form>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
