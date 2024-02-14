import { ConfirmModalBox } from '@/components/Modal/ConfirmModal'
import { Button, Group, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { ContactDto, IErrorMessage, IResponsePaginate } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiAdminContact from '../../../services/admin-contact'

export default function AdminContactPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)

  const [total, setTotal] = useState(0)

  const [contacts, setContact] = useState<ContactDto[]>([])
  const [contact, selectContact] = useState<ContactDto | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    handleFetchAll(currentPage)
  }, [])

  const handleFetchAll = async (currentPage: number) => {
    const res: IResponsePaginate<ContactDto[]> | IErrorMessage = await apiAdminContact.getAll(
      currentPage
    )
    if ('success' in res) {
      setContact(res.data)
      setTotal(Math.ceil(res.total / res.perPage))
      setCurrentPage(currentPage)
      setLoading(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }

  const handleChangePage = (value: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', value.toString())
    navigate(`?${searchParams.toString()}`)
    handleFetchAll(value)
  }

  const handleConfirmDelete = async () => {
    const res = await apiAdminContact.remove(contact!.id)
    if (res.success) {
      selectContact(null)
      setConfirmDelete(false)
      handleFetchAll(currentPage)
    }
  }

  const rows = contacts.map((contact: ContactDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{contact.id}</Table.Th>
      <Table.Th>{contact.name}</Table.Th>
      <Table.Th>{contact.email}</Table.Th>
      <Table.Th>{contact.title}</Table.Th>
      <Table.Th>{contact.resolve ? 'แก้ไขแล้ว' : 'ยังไม่แก้ไข'}</Table.Th>
      <Table.Th>
        <Group>
          <Button onClick={() => navigate(`/admin/contact/view/${contact.id}`)}>ดู</Button>

          <Button onClick={() => navigate(`/admin/contact/edit/${contact.id}`)} color="yellow">
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              selectContact(contact)
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
          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>ชื่อ</Table.Th>
                <Table.Th>อีเมล์</Table.Th>
                <Table.Th>เบอร์โทร</Table.Th>
                <Table.Th>สถานะ</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />

          <ConfirmModalBox
            title={'ลบห้อง'}
            message={`ยืนยันนการลบ: ${contact?.title}`}
            isOpen={confirmDelete}
            close={() => {
              selectContact(null)
              setConfirmDelete(false)
            }}
            confirm={handleConfirmDelete}
          />
        </Paper>
      )}
    </AdminLayout>
  )
}
