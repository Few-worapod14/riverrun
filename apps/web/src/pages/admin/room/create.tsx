import { Button, Input, NumberInput, Select, Switch, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { RoomCreateDto } from '@riverrun/interface'
import AdminLayout from '../../../components/Layout/AdminLayout'
import './create.scss'

export default function AdminRoomCreatePage() {
  const initData: RoomCreateDto = {
    name: '',
    pricePerNight: 0,
    detail: undefined
  }

  const form = useForm({
    initialValues: initData
  })

  return (
    <AdminLayout>
      <div>เพิ่มห้อง</div>

      <div>
        <Select data={['React', 'Angular', 'Svelte', 'Vue']} />
      </div>

      <div>
        <Input.Wrapper label="ชื่อห้อง">
          <Input {...form.getInputProps('name')} />
        </Input.Wrapper>
      </div>

      <div>
        <NumberInput label="ราคา" {...form.getInputProps('pricePerNight')} />
      </div>

      <div>
        <Input.Wrapper label="รายละเอียดห้อง">
          <TextInput {...form.getInputProps('detail')} />
        </Input.Wrapper>
      </div>

      <div>
        <Switch {...form.getInputProps('isActive')} />
      </div>

      <Button>กลับ</Button>
      <Button color="green">เพิ่มห้อง</Button>
    </AdminLayout>
  )
}
