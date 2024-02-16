import AdminLayout from '@/components/Layout/AdminLayout'
import { ConfirmModalBox } from '@/components/Modal/ConfirmModal'
import * as apiAdminPackage from '@/services/admin-package'
import { Button, Flex, Group, LoadingOverlay, Pagination, Paper, Table } from '@mantine/core'
import { IErrorMessage, IResponseData, IResponsePaginate, PackageDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AdminPackageIndexPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [total, setTotal] = useState(0)

  const [packages, setPackages] = useState<PackageDto[]>([])
  const [data, setData] = useState<PackageDto | null>(null)
  const [isConfirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    handleFetchCategory(currentPage)
  }, [])

  const handleFetchCategory = async (currentPage: number) => {
    const res: IResponsePaginate<PackageDto[]> | IErrorMessage = await apiAdminPackage.getAll(
      currentPage
    )

    if (res.success) {
      setPackages(res.data)
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
    handleFetchCategory(value)
  }

  const handleDelete = async () => {
    const res: IResponseData<string> | IErrorMessage = await apiAdminPackage.remove(data!.id)
    if (res.success) {
      setData(null)
      setConfirmDelete(false)
      handleFetchCategory(currentPage)
    }
  }

  const rows = packages.map((row: PackageDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{row.id}</Table.Th>
      <Table.Th>{row.name}</Table.Th>
      <Table.Th>{row.price}</Table.Th>
      <Table.Th>
        <Group>
          <Button
            onClick={() => {
              navigate(`/admin/package/view/${row.id}`)
            }}
          >
            ดู
          </Button>

          <Button
            onClick={() => {
              navigate(`/admin/package/edit/${row.id}`)
            }}
            color="yellow"
          >
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              const data = packages.find((x) => x.id == row.id)
              setData(data!)
              setConfirmDelete(true)
              handleChangePage(currentPage)
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
          <Paper shadow="xs" p="xl">
            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
              <Button onClick={() => navigate('/admin')}>กลับ</Button>
              <Button color="green" onClick={() => navigate('/admin/package/create')}>
                เพิ่ม
              </Button>
            </Flex>

            <Table withTableBorder withColumnBorders className="mb-5">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>ชื่อ</Table.Th>
                  <Table.Th>ราคา</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />
          </Paper>

          <ConfirmModalBox
            title="ยืนยันการลบ"
            message={`ยืนยันการลบ : ${data?.name}`}
            isOpen={isConfirmDelete}
            close={() => setConfirmDelete(false)}
            confirm={handleDelete}
          />
        </>
      )}
    </AdminLayout>
  )
}
