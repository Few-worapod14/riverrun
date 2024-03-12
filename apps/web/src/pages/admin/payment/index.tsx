import * as api from '@/services/admin-payment'
import {
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  LoadingOverlay,
  Pagination,
  Paper,
  Table
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { IErrorMessage, IResponseData, IResponsePaginate, PaymentDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import { ConfirmModalBox } from '../../../components/Modal/ConfirmModal'
import { ModalBox } from '../../../components/Modal/Modal'

export default function AdminRoomPaymentPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [total, setTotal] = useState(0)

  const [action, setAction] = useState<string | null>(null)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [isOpenConfirm, setOpenConfirm] = useState<boolean>(false)

  const [showDiv, setShowDiv] = useState(true)
  const [images, setImages] = useState<ImageListType>([])
  const [payments, setPayments] = useState<PaymentDto[]>([])
  const [payment, setPayment] = useState<PaymentDto | null>(null)

  const init = {
    no: '',
    name: '',
    bank: '',
    branch: ''
  }

  const form = useForm({
    initialValues: init,
    validate: {
      name: isNotEmpty('กรุณากรอกชื่อบัญชี'),
      bank: isNotEmpty('กรุณากรอกธนาคาร'),
      no: isNotEmpty('กรุณากรอกเลขบัญชี'),
      branch: isNotEmpty('กรุณากรอกสาขา')
    }
  })

  useEffect(() => {
    handleFetchAll(currentPage)
  }, [])

  const handleFetchAll = async (currentPage: number) => {
    const res: IResponsePaginate<PaymentDto[]> | IErrorMessage = await api.getAll(currentPage)

    if (res.success) {
      setPayments(res.data)
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

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    form.validate()
    if (form.isValid()) {
      const f = form.values
      const formData = new FormData()
      formData.append('no', f.no)
      formData.append('name', f.name)
      formData.append('bank', f.bank)
      formData.append('branch', f.branch)
      if (images?.[0]?.file) {
        formData.append(`file`, images?.[0]?.file, images?.[0]?.name)
      }
      const res: IResponseData<PaymentDto> | IErrorMessage = await api.create(formData)

      if (res.success) {
        setAction(null)
        setPayment(null)
        setOpenModal(false)
        handleFetchAll(currentPage)
      }
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    form.validate()
    if (form.isValid()) {
      const f = form.values
      const formData = new FormData()
      formData.append('no', f.no)
      formData.append('name', f.name)
      formData.append('bank', f.bank)
      formData.append('branch', f.branch)
      if (images?.[0]?.file) {
        formData.append(`file`, images?.[0]?.file, images?.[0]?.name)
      }

      const res: IResponseData<PaymentDto> | IErrorMessage = await api.update(payment!.id, formData)

      if (res.success) {
        setAction(null)
        setPayment(null)
        setOpenModal(false)
        handleFetchAll(currentPage)
      }
    }
  }

  const handleDelete = async () => {
    const res: IResponseData<string> | IErrorMessage = await api.remove(payment!.id)
    if (res.success) {
      setAction(null)
      setPayment(null)
      setOpenConfirm(false)
      handleFetchAll(currentPage)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAction(null)
  }

  const handleRemoveImg = async (id: number) => {
    const res: IResponseData<PaymentDto> | IErrorMessage = await api.removeImg(id)

    if (res.success) {
      setShowDiv(false)
      handleFetchAll(currentPage)
    }
  }

  const rows = payments.map((payment: PaymentDto, index) => (
    <Table.Tr key={index}>
      <Table.Th>{payment.id}</Table.Th>
      <Table.Th>{payment.name}</Table.Th>
      <Table.Th>{payment.bank}</Table.Th>
      <Table.Th>{payment.branch}</Table.Th>
      <Table.Th>{payment.no}</Table.Th>
      <Table.Th>
        <Group>
          <Button
            onClick={() => {
              const data = payments.find((x) => x.id == payment.id)
              form.setValues(data)
              setPayment(data!)
              setOpenModal(true)
              setAction('view')
              setShowDiv(true)
            }}
          >
            ดู
          </Button>

          <Button
            onClick={() => {
              setImages([])
              setAction('update')
              const data = payments.find((x) => x.id == payment.id)
              form.setValues(data)
              setPayment(data!)
              setOpenModal(true)
              setShowDiv(true)
            }}
            color="yellow"
          >
            แก้ไข
          </Button>

          <Button
            onClick={() => {
              const data = payments.find((x) => x.id == payment.id)
              setPayment(data!)
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
            <Button onClick={() => navigate('/admin/payment')}>กลับ</Button>

            <Button
              color="green"
              onClick={() => {
                setImages([])
                setPayment(init)
                form.setValues(init)
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
                <Table.Th>ชื่อบัญชี</Table.Th>
                <Table.Th>ธนาคาร</Table.Th>
                <Table.Th>สาขา</Table.Th>
                <Table.Th>เลขบัญชี</Table.Th>
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
              <Input.Wrapper label="ชื่อบัญชี" required className="mb-4">
                <Input
                  disabled={action == 'view' ? true : false}
                  placeholder="ชื่อบัญชี"
                  mt="md"
                  defaultValue={payment?.name}
                  {...form.getInputProps('name')}
                />
              </Input.Wrapper>
              <Input.Wrapper label="ธนาคาร" required className="mb-4">
                <Input
                  disabled={action == 'view' ? true : false}
                  placeholder="ธนาคาร"
                  mt="md"
                  defaultValue={payment?.bank}
                  {...form.getInputProps('bank')}
                />
              </Input.Wrapper>
              <Input.Wrapper label="สาขา" required className="mb-4">
                <Input
                  disabled={action == 'view' ? true : false}
                  placeholder="สาขา"
                  mt="md"
                  defaultValue={payment?.branch}
                  {...form.getInputProps('branch')}
                />
              </Input.Wrapper>

              <Input.Wrapper label="เลขบัญชี" required className="mb-4">
                <Input
                  disabled={action == 'view' ? true : false}
                  placeholder="เลขบัญชี"
                  mt="md"
                  defaultValue={payment?.no}
                  {...form.getInputProps('no')}
                />
              </Input.Wrapper>

              {action !== 'view' ? (
                <div className="mb-5">
                  <ImageUploading
                    value={images}
                    onChange={(images: ImageListType) => setImages(images)}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                    }) => (
                      <div>
                        <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                          <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            อัพโหลดรูป
                          </Button>

                          <Button color="red" onClick={onImageRemoveAll}>
                            ลบรูปทั้งหมด
                          </Button>
                        </Flex>

                        {imageList.map((image, index) => (
                          <div key={index} className="mb-5">
                            <img src={image.dataURL} alt="" width="100" />
                            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                              <Button onClick={() => onImageUpdate(index)}>เปลี่ยนรูป</Button>
                              <Button color="red" onClick={() => onImageRemove(index)}>
                                ลบ
                              </Button>
                            </Flex>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
              ) : null}

              {payment?.path && showDiv ? (
                <>
                  <hr />
                  <Grid>
                    <Grid.Col span={3}>
                      <Image src={payment.fullPath} />
                      <Button color="red" onClick={() => handleRemoveImg(payment.id)}>
                        ลบรูป
                      </Button>
                    </Grid.Col>
                  </Grid>
                </>
              ) : null}

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
