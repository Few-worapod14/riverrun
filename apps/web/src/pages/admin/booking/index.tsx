import { convertBookingStatus } from '@/utils/booking'
import { Button, Group, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { BookingDto, IResponsePaginate } from '@riverrun/interface'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiAdminBooking from '../../../services/admin-booking'

dayjs.extend(customParseFormat)

export default function AdminBookingIndexPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  // const [isError, setError] = useState(false)
  // const [msg, setMsg] = useState<IErrorMessage>()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [total, setTotal] = useState(0)

  const [bookings, setBooking] = useState<BookingDto[]>([])

  useEffect(() => {
    handleFetchBooking(currentPage)
  }, [])

  const handleFetchBooking = async (currentPage: number) => {
    const res: IResponsePaginate<BookingDto[]> = await apiAdminBooking.getAll(currentPage)
    if (res.success) {
      res as IResponsePaginate<BookingDto[]>
      setBooking(res.data)
      setTotal(Math.ceil(res.total / res.perPage))
      setCurrentPage(currentPage)
      setLoading(false)
    }
  }

  const handleChangePage = (value: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', value.toString())
    navigate(`?${searchParams.toString()}`)
    handleFetchBooking(value)
  }

  const rows = bookings.map((booking: BookingDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{booking?.slot?.room?.name}</Table.Th>
      <Table.Th>
        {booking?.customer
          ? `${booking?.customer?.firstName} - ${booking?.customer?.lastName}`
          : booking.name}
      </Table.Th>
      <Table.Th>
        {dayjs(booking?.startBookingDate).format('DD-MM-YYYY')} -
        {dayjs(booking?.endBookingDate).format('DD-MM-YYYY')}
      </Table.Th>
      <Table.Th>{convertBookingStatus(booking.status)}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/booking/view/${booking.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/booking/edit/${booking.id}`)} color="yellow">
            แก้ไข
          </Button>
        </Group>
      </Table.Th>
    </Table.Tr>
  ))

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <Paper shadow="xs" p="xl">
          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ชื่อห้อง</Table.Th>
                <Table.Th>ชื่อลูกค้า</Table.Th>
                <Table.Th>วันเข้าพัก</Table.Th>
                <Table.Th>สถานะ</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />
        </Paper>
      )}
    </AdminLayout>
  )
}
