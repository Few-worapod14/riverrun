import { Button, Group, LoadingOverlay, Pagination, Table } from '@mantine/core'
import { IErrorMessage, IResponsePaginate, RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiAdminRoom from '../../../services/admin-room'

export default function AdminRoomPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)
  const [msg, setMsg] = useState<IErrorMessage>()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [perPage, setPerPage] = useState<number>(50)
  const [total, setTotal] = useState(0)

  const [rooms, setRoom] = useState<RoomDto[]>([])

  useEffect(() => {
    handleFetchAllUser(currentPage)
  }, [searchParams])

  const handleFetchAllUser = async (currentPage: number) => {
    const res: IResponsePaginate<RoomDto[]> | IErrorMessage = await apiAdminRoom.getAll(currentPage)
    if ('success' in res) {
      setRoom(res.data)
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
    handleFetchAllUser(value)
  }

  const rows = rooms.map((room: RoomDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{room.id}</Table.Th>
      <Table.Th>{room.name}</Table.Th>
      <Table.Th>{room.price}</Table.Th>
      <Table.Th>{room.isActive}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/room/view/${room.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/room/edit/${room.id}`)} color="yellow">
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              // setId(element.id)
              // setConfirm(true)
            }}
            color="red"
          >
            ลบ
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
        <>
          <Button onClick={() => navigate('/admin/room/create')}>เพิ่มห้อง</Button>
          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>ชื่อห้อง</Table.Th>
                <Table.Th>ราคา</Table.Th>
                <Table.Th>สถานะ</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />
        </>
      )}
    </AdminLayout>
  )
}
