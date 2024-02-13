import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminCustomer from '@/services/admin-customer'
import { Button, Flex, Grid, LoadingOverlay, Paper } from '@mantine/core'
import { CustomerDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminCustomerViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [customer, setCustomer] = useState<CustomerDto | null>(null)

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

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <Paper shadow="xs" p="xl">
            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
              <Button
                onClick={() => {
                  navigate('/admin/customer')
                }}
              >
                กลับ
              </Button>
            </Flex>

            <h3>ข้อมูลลูกค้า</h3>

            <Grid className="mb-5">
              <Grid.Col span={3}>ชื่อ :</Grid.Col>
              <Grid.Col span={9}>
                {customer?.firstName} - {customer?.lastName}
              </Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>อีิเมล :</Grid.Col>
              <Grid.Col span={9}>{customer?.email}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>เบอร์โทร :</Grid.Col>
              <Grid.Col span={9}>{customer?.mobile}</Grid.Col>
            </Grid>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
