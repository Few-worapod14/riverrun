import { ConfirmModalBox } from '@/components/Modal/ConfirmModal'
import { Button, Flex, Group, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
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

  const [rooms, setRooms] = useState<RoomDto[]>([])
  const [room, selectRoom] = useState<RoomDto | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    handleFetchAllUser(currentPage)
  }, [])

  const handleFetchAllUser = async (currentPage: number) => {
    const res: IResponsePaginate<RoomDto[]> | IErrorMessage = await apiAdminRoom.getAll(currentPage)
    if ('success' in res) {
      setRooms(res.data)
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

  const handleConfirmDelete = async () => {
    const res = await apiAdminRoom.remove(room!.id)
    if (res.success) {
      selectRoom(null)
      setConfirmDelete(false)
      handleFetchAllUser(currentPage)
    }
  }

  const rows = rooms.map((room: RoomDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{room.id}</Table.Th>
      <Table.Th>{room.name}</Table.Th>
      <Table.Th>{room.pricePerNight}</Table.Th>
      <Table.Th>{room.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/room/view/${room.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/room/edit/${room.id}`)} color="yellow">
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              selectRoom(room)
              setConfirmDelete(true)
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
        <Paper shadow="xs" p="xl">
          <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
            <Button onClick={() => navigate('/admin/room/category')}>จัดการประเภทห้อง</Button>
            <Button color="green" onClick={() => navigate('/admin/room/create')}>
              เพิ่มห้อง
            </Button>
          </Flex>

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

          <ConfirmModalBox
            title={'ลบห้อง'}
            message={`ยืนยันนการลบห้อง: ${room?.name}`}
            isOpen={confirmDelete}
            close={() => {
              selectRoom(null)
              setConfirmDelete(false)
            }}
            confirm={handleConfirmDelete}
          />
        </Paper>
      )}
    </AdminLayout>
  )
}
