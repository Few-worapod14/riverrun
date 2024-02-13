import AdminLayout from '@/components/Layout/AdminLayout'
import * as apiAdminCustomer from '@/services/admin-customer'
import { Button, Grid, Group, Input, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { CustomerDto, IErrorMessage, IResponsePaginate } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AdminCustomerIndexPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)
  const [msg, setMsg] = useState<IErrorMessage>()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [perPage, setPerPage] = useState<number>(50)
  const [total, setTotal] = useState(0)

  const [customers, setCustomer] = useState<CustomerDto[]>([])
  const [keyword, setKeyword] = useState<string | null>(null)

  useEffect(() => {
    handleFetchBooking(currentPage)
  }, [])

  const handleFetchBooking = async (currentPage: number) => {
    const res: IResponsePaginate<CustomerDto[]> | IErrorMessage = await apiAdminCustomer.getAll(
      currentPage
    )
    if ('success' in res) {
      setCustomer(res.data)
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

  const handleSearch = () => {}

  const rows = customers.map((customer: CustomerDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{`${customer.firstName} - ${customer.lastName}`}</Table.Th>
      <Table.Th>{customer.email}</Table.Th>
      <Table.Th>{customer.mobile}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/customer/view/${customer.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/customer/edit/${customer.id}`)} color="yellow">
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
          <Grid className="mb-5">
            <Grid.Col span={3}>
              <Input placeholder="ค้นหาชื่อ นามสกุล" onChange={(value) => setKeyword(value!)} />
            </Grid.Col>

            <Grid.Col span={3}>
              <Button onClick={handleSearch}>ค้นหา</Button>
            </Grid.Col>
          </Grid>

          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ชื่อลูกค้า</Table.Th>
                <Table.Th>อีเมล์</Table.Th>
                <Table.Th>เบอร์โทร</Table.Th>
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
