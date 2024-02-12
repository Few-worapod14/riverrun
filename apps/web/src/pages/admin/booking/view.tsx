import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminBooking from '@/services/admin-booking'
import { convertBookingStatus } from '@/utils/booking'
import { Button, Flex, Grid, LoadingOverlay, Paper } from '@mantine/core'
import { BookingDto } from '@riverrun/interface'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminBookingViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [booking, setBooking] = useState<BookingDto | null>(null)

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

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <Paper shadow="xs" p="xl">
            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
              <Button
                onClick={() => {
                  navigate('/admin/booking')
                }}
              >
                กลับ
              </Button>
            </Flex>

            <h3>การจองห้อง</h3>

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
                  : '-'}
              </Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>เช็คเอาต์ :</Grid.Col>
              <Grid.Col span={9}>
                {booking?.checkOutDate
                  ? dayjs(booking?.checkOutDate).format('DD/MM/YYYY HH:mm:ss')
                  : '-'}
              </Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>ลูกค้า :</Grid.Col>
              <Grid.Col span={9}>
                {`${booking?.customer?.firstName} - ${booking?.customer?.lastName}`}
              </Grid.Col>
            </Grid>

            <Grid className="mb-5">
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
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>ยอดรวมสุทธิ :</Grid.Col>
              <Grid.Col span={9}>{booking?.totalAmount}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>หมายเหตุ :</Grid.Col>
              <Grid.Col span={9}>{booking?.note}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>สถานะ :</Grid.Col>
              <Grid.Col span={9}>{convertBookingStatus(booking!.status)}</Grid.Col>
            </Grid>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
