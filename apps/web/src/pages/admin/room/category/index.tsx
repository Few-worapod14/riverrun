import {
  Button,
  Checkbox,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  Pagination,
  Paper,
  Table
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import {
  IErrorMessage,
  IResponseData,
  IResponsePaginate,
  RoomCategoryDto
} from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../../components/Layout/AdminLayout'
import { ConfirmModalBox } from '../../../../components/Modal/ConfirmModal'
import { ModalBox } from '../../../../components/Modal/Modal'
import * as apiAdminRoomCategory from '../../../../services/admin-room-category'

export default function AdminRoomCategoryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [total, setTotal] = useState(0)

  const [action, setAction] = useState<string | null>(null)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [isOpenConfirm, setOpenConfirm] = useState<boolean>(false)

  const [categories, setAllCategory] = useState<RoomCategoryDto[]>([])
  const [category, setCategory] = useState<RoomCategoryDto | null>(null)

  const init = {
    name: '',
    isActive: true
  }

  const form = useForm({
    initialValues: init,
    validate: {
      name: isNotEmpty('กรุณากรอกประเภทห้องพัก')
    }
  })

  useEffect(() => {
    handleFetchCategory(currentPage)
  }, [])

  const handleFetchCategory = async (currentPage: number) => {
    const res: IResponsePaginate<RoomCategoryDto[]> | IErrorMessage =
      await apiAdminRoomCategory.getAll(currentPage)

    if (res.success) {
      setAllCategory(res.data)
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

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    form.validate()
    if (form.isValid()) {
      const res: IResponseData<RoomCategoryDto> | IErrorMessage = await apiAdminRoomCategory.create(
        form.values
      )

      if (res.success) {
        setAction(null)
        setCategory(null)
        setOpenModal(false)
        handleFetchCategory(currentPage)
      }
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    form.validate()
    if (form.isValid()) {
      const res: IResponseData<RoomCategoryDto> | IErrorMessage = await apiAdminRoomCategory.update(
        category!.id,
        form.values
      )

      if (res.success) {
        setAction(null)
        setCategory(null)
        setOpenModal(false)
        handleFetchCategory(currentPage)
      }
    }
  }

  const handleDelete = async () => {
    const res: IResponseData<string> | IErrorMessage = await apiAdminRoomCategory.remove(
      category!.id
    )
    if (res.success) {
      setAction(null)
      setCategory(null)
      setOpenConfirm(false)
      handleFetchCategory(currentPage)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAction(null)
  }

  const rows = categories.map((category: RoomCategoryDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{category.id}</Table.Th>
      <Table.Th>{category.name}</Table.Th>
      <Table.Th>{category.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</Table.Th>
      <Table.Th>
        <Group>
          <Button
            onClick={() => {
              setAction('view')
              const data = categories.find((x) => x.id == category.id)
              form.setValues({ ...data })
              setCategory(data!)
              setOpenModal(true)
            }}
          >
            ดู
          </Button>

          <Button
            onClick={() => {
              setAction('update')
              const data = categories.find((x) => x.id == category.id)
              form.setValues({ ...data })
              setCategory(data!)
              setOpenModal(true)
            }}
            color="yellow"
          >
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              const data = categories.find((x) => x.id == category.id)
              setCategory(data!)
              setOpenConfirm(true)
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
        <Paper shadow="xs" p="xl">
          <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
            <Button onClick={() => navigate('/admin/room')}>กลับ</Button>

            <Button
              color="green"
              onClick={() => {
                setOpenModal(true)
                setAction('create')
              }}
            >
              เพิ่มประเภทห้อง
            </Button>
          </Flex>
          <Table withTableBorder withColumnBorders className="mb-5">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>ประเภท</Table.Th>
                <Table.Th>สถานะ</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Pagination total={total} defaultValue={currentPage} onChange={handleChangePage} />
          <ModalBox
            title={action == 'create' ? 'เพิ่ม' : 'แก้ไข'}
            isOpen={isOpenModal}
            onClose={handleCloseModal}
          >
            <form onSubmit={action == 'create' ? handleCreate : handleUpdate}>
              <Input.Wrapper label="ประเภทห้องพัก" required className="mb-4">
                <Input
                  disabled={action == 'view' ? true : false}
                  placeholder="ประเภทห้องพัก"
                  mt="md"
                  defaultValue={category?.name}
                  {...form.getInputProps('name')}
                />
              </Input.Wrapper>

              <div className="mb-4">
                <Checkbox
                  disabled={action == 'view' ? true : false}
                  {...form.getInputProps('isActive')}
                  label="เปิดใช้งาน"
                  defaultChecked={category?.isActive ?? true}
                />
              </div>

              <Flex gap="md" justify="center" direction="row" wrap="wrap">
                <Button
                  color="grey"
                  onClick={() => {
                    setAction(null)
                    setOpenModal(false)
                  }}
                >
                  ยกเลิก
                </Button>

                <Button type="submit">บันทึก</Button>
              </Flex>
            </form>
          </ModalBox>
          <ConfirmModalBox
            title="ยืนยันการลบ"
            message="ยืนยันการลบ"
            isOpen={isOpenConfirm}
            close={() => setOpenConfirm(false)}
            confirm={handleDelete}
          />
        </Paper>
      )}
    </AdminLayout>
  )
}
