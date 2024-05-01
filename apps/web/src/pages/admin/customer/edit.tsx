import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminCustomer from '@/services/admin-customer'
import { Button, Flex, Grid, Input, LoadingOverlay, Paper } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CustomerDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminCustomerEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [customer, setCustomer] = useState<CustomerDto | null>(null)

  const initData = {
    ...customer
  }

  const form = useForm({
    initialValues: initData
  })

  useEffect(() => {
    handleGetById()
  }, [])

  const handleGetById = async () => {
    const res = await adminCustomer.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setCustomer(res.data!)
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    form.validate()
    if (form.isValid()) {
      const data = form.values
      const res = await adminCustomer.update(Number(id), data)
      if (res.success) {
        navigate('/admin/customer')
      }
    }
  }

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <Paper shadow="xs" p="xl">
            <h3>ข้อมูลลูกค้า</h3>

            <form onSubmit={handleUpdate}>
              <Grid className="mb-5">
                <Grid.Col span={3}>ชื่อ :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={customer?.firstName}
                    value={customer?.firstName}
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>นามสกุล :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={customer?.lastName}
                    value={customer?.lastName}
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>อีิเมล :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={customer?.email}
                    value={customer?.email}
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>เบอร์โทร :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={customer?.mobile}
                    value={customer?.mobile}
                    {...form.getInputProps('mobile')}
                  />
                </Grid.Col>
              </Grid>

              <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                <Button
                  onClick={() => {
                    navigate('/admin/customer')
                  }}
                >
                  กลับ
                </Button>

                <Button type="submit" color="green">
                  บันทึกข้อมูล
                </Button>
              </Flex>
            </form>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
