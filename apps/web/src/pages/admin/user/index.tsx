import AdminLayout from '@/components/Layout/AdminLayout'
import { ConfirmModalBox } from '@/components/Modal/ConfirmModal'
import { ModalBox } from '@/components/Modal/Modal'
import * as apiAdminUser from '@/services/admin-user'
import { Button, Grid, Group, Input, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { AdminDto, IErrorMessage, IResponsePaginate } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AdminUserIndexPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [total, setTotal] = useState(0)

  const [users, setUsers] = useState<AdminDto[]>([])
  const [keyword, setKeyword] = useState<string | null>(null)

  const [user, setUser] = useState<AdminDto | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState({
    title: null,
    message: null
  })

  useEffect(() => {
    handleFetchUser(currentPage)
  }, [])

  const handleFetchUser = async (currentPage: number) => {
    const res: IResponsePaginate<AdminDto[]> | IErrorMessage = await apiAdminUser.getAll(
      currentPage
    )
    if (res.success) {
      setUsers(res.data)
      setTotal(Math.ceil(res.total / res.perPage))
      setCurrentPage(currentPage)
      setLoading(false)
    }
  }

  const handleChangePage = (value: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', value.toString())
    navigate(`?${searchParams.toString()}`)
    handleFetchUser(value)
  }

  const handleSearch = async () => {
    searchParams.set('keyword', keyword!)
    navigate(`?${searchParams.toString()}`)
    const res: IResponsePaginate<AdminDto[]> | IErrorMessage = await apiAdminUser.getAll(
      currentPage,
      keyword!
    )
    if (res.success) {
      setUsers(res.data)
      setTotal(Math.ceil(res.total / res.perPage))
      setCurrentPage(currentPage)
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    const res = await apiAdminUser.remove(user!.id)
    if (res.success) {
      setUser(null)
      setConfirmDelete(false)
      handleFetchUser(currentPage)
    } else {
      setUser(null)
      setConfirmDelete(false)
      setOpenModal(true)
      setErrorMsg({
        message: res.message,
        title: 'Error'
      })
    }
  }

  const rows = users.map((admin: AdminDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{admin.username}</Table.Th>
      <Table.Th>{`${admin.firstName} - ${admin.lastName}`}</Table.Th>
      <Table.Th>{admin.email}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/user/view/${admin.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/user/edit/${admin.id}`)} color="yellow">
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              setUser(admin)
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
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <Paper shadow="xs" p="xl">
            <Grid className="mb-5">
              <Grid.Col span={3}>
                <Input
                  placeholder="ค้นหาชื่อ นามสกุล"
                  onChange={(event) => setKeyword(event.currentTarget.value)}
                />
              </Grid.Col>

              <Grid.Col span={3}>
                <Button onClick={handleSearch}>ค้นหา</Button>
              </Grid.Col>

              <Grid.Col span={6}>
                <Button
                  className="float-right"
                  color="green"
                  onClick={() => navigate('/admin/user/create')}
                >
                  เพิ่มผู้ดูแลระบบ
                </Button>
              </Grid.Col>
            </Grid>

            <Table withTableBorder withColumnBorders className="mb-5">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>username</Table.Th>
                  <Table.Th>ชื่อ</Table.Th>
                  <Table.Th>อีเมล์</Table.Th>
                  <Table.Th>สถานะ</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />
          </Paper>

          <ConfirmModalBox
            title={'ลบแอดมิน'}
            message={`ยืนยันการแอดมินห้อง: ${user?.username}`}
            isOpen={confirmDelete}
            close={() => {
              setUser(null)
              setConfirmDelete(false)
            }}
            confirm={handleConfirmDelete}
          />

          <ModalBox
            title={errorMsg?.title}
            isOpen={isOpenModal}
            onClose={() => setOpenModal(false)}
          >
            {errorMsg?.message?.[0]?.message}
          </ModalBox>
        </>
      )}
    </AdminLayout>
  )
}
