import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminUser from '@/services/admin-user'
import { Button, Flex, Grid, LoadingOverlay, Paper } from '@mantine/core'
import { AdminDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminUserViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<AdminDto | null>(null)

  useEffect(() => {
    handleGetById()
  }, [])

  const handleGetById = async () => {
    const res = await adminUser.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setUser(res.data!)
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
                  navigate('/admin/user')
                }}
              >
                กลับ
              </Button>
            </Flex>

            <h3>ข้อมูลลูกค้า</h3>

            <Grid className="mb-5">
              <Grid.Col span={3}>Username :</Grid.Col>
              <Grid.Col span={9}>{user?.username}</Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>ชื่อ :</Grid.Col>
              <Grid.Col span={9}>
                {user?.firstName} - {user?.lastName}
              </Grid.Col>
            </Grid>

            <Grid className="mb-5">
              <Grid.Col span={3}>อีเมล์ :</Grid.Col>
              <Grid.Col span={9}>{user?.email}</Grid.Col>
            </Grid>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
