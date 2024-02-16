import AdminLayout from '@/components/Layout/AdminLayout'
import * as api from '@/services/admin-package'
import { Button, Flex, Grid, LoadingOverlay, Paper } from '@mantine/core'
import { PackageDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminPackageViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)

  const [data, setData] = useState<PackageDto | null>(null)

  const handleGetById = async () => {
    const res = await api.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setData(res.data!)
    }
  }

  useEffect(() => {
    handleGetById()
  }, [])

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <h3>ข้อมูลแพ็คเกจ</h3>
          <Paper shadow="xs" p="xl">
            <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
              <Button
                onClick={() => {
                  navigate('/admin/package')
                }}
              >
                กลับ
              </Button>
            </Flex>

            <div className="mb-5">
              <Grid className="mb-5">
                <Grid.Col span={3}>ชื่อแพ็คเกจ :</Grid.Col>

                <Grid.Col span={9}>{data?.name}</Grid.Col>
              </Grid>
            </div>

            <div className="mb-5">
              <Grid className="mb-5">
                <Grid.Col span={3}>ราคา :</Grid.Col>

                <Grid.Col span={9}>{data?.price} ฿</Grid.Col>
              </Grid>
            </div>

            <div className="mb-5">
              <Grid className="mb-5">
                <Grid.Col span={3}>รายละเอียด :</Grid.Col>

                <Grid.Col span={9}>{data?.detail}</Grid.Col>
              </Grid>
            </div>
          </Paper>
        </>
      )}
    </AdminLayout>
  )
}
