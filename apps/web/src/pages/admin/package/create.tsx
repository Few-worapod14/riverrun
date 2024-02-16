import AdminLayout from '@/components/Layout/AdminLayout'
import * as api from '@/services/admin-package'
import { Button, Flex, Input, LoadingOverlay, NumberInput, Paper, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PackageDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  mode: string
}

export default function AdminPackageCreatePage({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)

  const [data, setData] = useState<PackageDto | null>(null)

  const initData = {
    ...data
  }

  const form = useForm({
    initialValues: initData
  })

  const handleGetById = async () => {
    const res = await api.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setData(res.data!)
    }
  }

  useEffect(() => {
    if (mode === 'edit') {
      handleGetById()
    } else {
      setLoading(false)
    }
  }, [])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (form.validate()) {
      if (mode === 'create') {
        const res = await api.create(form.values)
        if (res.success) {
          navigate('/admin/package')
        }
      } else {
        const res = await api.update(Number(id), form.values)
        if (res.success) {
          navigate('/admin/package')
        }
      }
    }
  }

  console.log('zzz', data)

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <h3>ข้อมูลแพ็คเกจ</h3>
          <Paper shadow="xs" p="xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <Input.Wrapper label="ชื่อแพ็คเกจ">
                  <Input
                    defaultValue={data?.name}
                    value={data?.name}
                    {...form.getInputProps('name')}
                  />
                </Input.Wrapper>
              </div>

              <div className="mb-5">
                <NumberInput
                  label="ราคา ฿"
                  defaultValue={data?.price}
                  value={data?.price}
                  {...form.getInputProps('price')}
                />
              </div>

              <div className="mb-5">
                <Textarea
                  label="รายละเอียด"
                  defaultValue={data?.detail}
                  value={data?.detail}
                  minRows={10}
                  maxRows={10}
                  autosize
                  {...form.getInputProps('detail')}
                />
              </div>

              <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                <Button
                  onClick={() => {
                    navigate('/admin/package')
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
        </>
      )}
    </AdminLayout>
  )
}
