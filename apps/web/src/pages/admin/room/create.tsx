import * as apiRoom from '@/services/admin-room.ts'
import {
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  NumberInput,
  Paper,
  Radio,
  Select,
  Textarea
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { RoomCategoryDto, RoomDto, RoomImageDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiCategory from '../../../services/admin-room-category.ts'

import { ConfirmModalBox } from '@/components/Modal/ConfirmModal.tsx'
import './create.scss'

type Props = {
  mode: string
}

export default function AdminRoomCreatePage({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const maxNumber = 10

  const [categories, setCategories] = useState<RoomCategoryDto[]>([])
  const [room, setRoom] = useState<RoomDto | null>(null)

  const [images, setImages] = useState<ImageListType>([])
  const [isConfirmDelete, setConfirmDelete] = useState(false)
  const [removeData, setRemoveData] = useState<RoomImageDto | null>(null)

  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
  }

  useEffect(() => {
    handleFetchCategory()
  }, [])

  useEffect(() => {
    if (mode == 'edit') {
      handleGetRoom()
    }
  }, [])

  const handleFetchCategory = async () => {
    const res = await apiCategory.getAll(1, 100)
    if (res.success) {
      setCategories(res.data)
    }
  }

  const initData = {
    categoryId: 0,
    name: '',
    pricePerNight: 0,
    detail: null,
    isActive: 'true'
  }

  const handleGetRoom = async () => {
    const res = await apiRoom.getById(Number(id))
    if (res.success) {
      setRoom(res.data)

      const init = {
        categoryId: res.data.category.id,
        name: res.data.name,
        pricePerNight: res.data.pricePerNight,
        detail: res.data.detail,
        isActive: 'true'
      }
      form.setValues(init)
    }
  }

  const form = useForm({
    initialValues: initData
  })

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (form.validate()) {
      const f = form.values
      const formData = new FormData()
      formData.append('categoryId', f.categoryId.toString())
      formData.append('name', f.name)
      formData.append('pricePerNight', f.pricePerNight.toString())
      formData.append('detail', f.detail!)
      formData.append('isActive', f.isActive)

      const res = await apiRoom.create(formData)
      if (res.success) {
        navigate('/admin/room')
      }
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const formData = new FormData()
    if (form.validate()) {
      const f = form.values
      formData.append('categoryId', f.categoryId.toString())
      formData.append('name', f.name)
      formData.append('pricePerNight', f.pricePerNight.toString())
      formData.append('detail', f.detail!)
      formData.append('isActive', f.isActive)

      images.forEach(async (image) => {
        formData.append(`files`, image.file!, image.file?.name)
      })

      const res = await apiRoom.update(Number(id), formData)
      if (res.success) {
        navigate('/admin/room')
      }
    }
  }

  const handleSelectChange = (value: number) => {
    form.setFieldValue('categoryId', value)
  }

  const handleDeleteImage = async () => {
    const res = await apiRoom.removeImage(Number(removeData?.id))
    if (res.success) {
      navigate('/admin/room')
    }
  }

  const handleConfirmDeleteImg = (image: RoomImageDto) => {
    setConfirmDelete(true)
    setRemoveData(image)
  }

  return (
    <AdminLayout>
      <h3>ข้อมูลห้อง</h3>

      <Paper shadow="xs" p="xl">
        <form onSubmit={mode == 'create' ? handleCreate : handleUpdate}>
          <div className="mb-5">
            <Select
              label="ประเภทห้อง"
              data={categories.map((x) => ({ value: x.id.toString(), label: x.name }))}
              defaultValue={room?.category?.id!.toString()}
              value={room?.category?.id.toString()}
              onChange={(value) => handleSelectChange(Number(value))}
              withAsterisk
            />
          </div>

          <div className="mb-5">
            <Input.Wrapper label="ชื่อห้อง">
              <Input value={room?.name} defaultValue={room?.name} {...form.getInputProps('name')} />
            </Input.Wrapper>
          </div>

          <div className="mb-5">
            <NumberInput
              label="ราคา"
              value={room?.pricePerNight}
              defaultValue={room?.pricePerNight}
              {...form.getInputProps('pricePerNight')}
            />
          </div>

          <div className="mb-5">
            <Textarea
              label="รายละเอียดห้อง"
              defaultValue={room?.detail}
              value={room?.detail}
              minRows={10}
              maxRows={10}
              autosize
              {...form.getInputProps('detail')}
            />
          </div>

          <div className="mb-5">
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
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

          <div className="mb-5">
            <Radio.Group
              onChange={(value) => {
                form.setFieldValue('isActive', value)
                setRoom({
                  ...room!,
                  isActive: value === 'true' ? true : false
                })
              }}
              defaultValue={room?.isActive ? 'true' : 'false'}
              value={room?.isActive ? 'true' : 'false'}
              name="isActive"
              label="สถานะ"
              withAsterisk
            >
              <Group mt="xs">
                <Radio value="true" label="เปิดใช้งาน" />
                <Radio value="false" label="ปิดใช้งาน" />
              </Group>
            </Radio.Group>
          </div>

          {room?.images.length != 0 ? (
            <>
              <Grid className="mb-5">
                {room?.images.map((x) => {
                  return (
                    <Grid.Col span={3}>
                      <Grid className="mb-5">
                        <Grid.Col span={12}>
                          <Image src={x.fullPath} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                          <Center>
                            <Button onClick={() => handleConfirmDeleteImg(x)} color="red">
                              ลบ
                            </Button>
                          </Center>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  )
                })}
              </Grid>
              <hr />
            </>
          ) : null}

          <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
            <Button
              onClick={() => {
                navigate('/admin/room')
              }}
            >
              กลับ
            </Button>
            <Button color="green" type="submit">
              บันทึก
            </Button>
          </Flex>
        </form>
      </Paper>

      <ConfirmModalBox
        title={'ยืนยันการลบรูป'}
        message={'คุณต้องการลบรูปภาพหรือไม่'}
        isOpen={isConfirmDelete}
        close={() => setConfirmDelete(false)}
        confirm={handleDeleteImage}
      />
    </AdminLayout>
  )
}
