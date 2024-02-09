import * as apiRoom from '@/services/admin-room.ts'
import { Button, Flex, Group, Input, NumberInput, Radio, Select, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { RoomCategoryDto, RoomDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'
import * as apiCategory from '../../../services/admin-room-category.ts'

import './create.scss'

type Props = {
  mode: string
}

export default function AdminRoomCreatePage({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState<RoomCategoryDto[]>([])
  const [room, setRoom] = useState<RoomDto | null>(null)

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
    detail: undefined,
    isActive: 'true'
  }

  const handleGetRoom = async () => {
    const res = await apiRoom.getById(Number(id))
    if (res.success) {
      setRoom(res.data!)

      const init = {
        categoryId: res.data!.category!.id,
        name: res.data!.name,
        pricePerNight: res.data!.pricePerNight,
        detail: undefined,
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
      const data = form.values
      const res = await apiRoom.create({
        ...data,
        isActive: data.isActive === 'true' ? true : false
      })
      if (res.success) {
        navigate('/admin/room')
      }
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (form.validate()) {
      const data = form.values
      const res = await apiRoom.update(Number(id), {
        ...data,
        isActive: data.isActive === 'true' ? true : false
      })
      if (res.success) {
        navigate('/admin/room')
      }
    }
  }

  const handleSelectChange = (value: number) => {
    form.setFieldValue('categoryId', value)
  }

  return (
    <AdminLayout>
      <h3>เพิ่มห้อง</h3>

      <form onSubmit={mode == 'create' ? handleCreate : handleUpdate}>
        <div className="mb-5">
          <Select
            label="ประเภทห้อง"
            data={categories.map((x) => ({ value: x.id.toString(), label: x.name }))}
            defaultValue={room?.category?.id!.toString()}
            value={'2'}
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
            {...form.getInputProps('detail')}
          />
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

        <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
          <Button
            onClick={() => {
              // handleGetRoom()
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
    </AdminLayout>
  )
}
