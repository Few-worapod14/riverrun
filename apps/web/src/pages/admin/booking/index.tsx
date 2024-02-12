import { convertBookingStatus } from '@/utils/booking'
import { Button, Group, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { BookingDto, IErrorMessage, IResponsePaginate } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiAdminBooking from '../../../services/admin-booking'

export default function AdminBookingIndexPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)
  const [msg, setMsg] = useState<IErrorMessage>()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [perPage, setPerPage] = useState<number>(50)
  const [total, setTotal] = useState(0)

  const [bookings, setBooking] = useState<BookingDto[]>([])

  useEffect(() => {
    handleFetchBooking(currentPage)
  }, [])

  const handleFetchBooking = async (currentPage: number) => {
    const res: IResponsePaginate<BookingDto[]> | IErrorMessage = await apiAdminBooking.getAll(
      currentPage
    )
    if ('success' in res) {
      setBooking(res.data)
      setTotal(Math.ceil(res.total / res.perPage))
      setPerPage(res.perPage)
      setCurrentPage(currentPage)
      setLoading(false)
    } else {
      const errorResponse = res as IErrorMessage
      setError(true)
      setMsg(errorResponse)
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
      <Table.Th>{booking?.room?.name}</Table.Th>
      <Table.Th>{`${booking?.customer?.firstName} - ${booking?.customer?.lastName}`}</Table.Th>
      <Table.Th>{booking.checkInDate?.toDateString()}</Table.Th>
      <Table.Th>{booking.checkOutDate?.toDateString()}</Table.Th>
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
      {loading && !isError ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <Paper shadow="xs" p="xl">
          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ชื่อห้อง</Table.Th>
                <Table.Th>ชื่อลูกค้า</Table.Th>
                <Table.Th>เช็คอิน</Table.Th>
                <Table.Th>เช็คเอาต์</Table.Th>
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
