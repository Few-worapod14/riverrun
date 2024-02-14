import * as apiContact from '@/services/admin-contact'
import { Button, Flex, Grid, LoadingOverlay, Paper, Select } from '@mantine/core'
import { ContactDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/Layout/AdminLayout'

export default function AdminContactEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [contact, setContact] = useState<ContactDto | null>(null)

  useEffect(() => {
    handleGetContact()
  }, [])

  const handleGetContact = async () => {
    const res = await apiContact.getById(Number(id))
    if (res.success) {
      setLoading(false)
      setContact(res.data!)
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const res = await apiContact.update(Number(id), contact)
    if (res.success) {
      navigate('/admin/contact')
    }
  }

  const handleStatus = async (status: string) => {
    setContact({
      ...contact,
      resolve: Boolean(status)
    })
  }

  return (
    <AdminLayout>
      {loading ? (
        <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        <>
          <h3>ข้อมูลผู้ติดต่อ</h3>

          <form onSubmit={handleUpdate}>
            <Paper shadow="xs" p="xl">
              <Grid className="mb-5">
                <Grid.Col span={3}>ชื่อ :</Grid.Col>

                <Grid.Col span={9}>{contact?.name}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>อีเมล์ :</Grid.Col>
                <Grid.Col span={9}>{contact?.email}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>เบอร์โทร :</Grid.Col>
                <Grid.Col span={9}>{contact?.tel} ฿</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>หัวข้อ :</Grid.Col>

                <Grid.Col span={9}>{contact?.title}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>รายละเอียด :</Grid.Col>

                <Grid.Col span={9}>{contact?.message}</Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>สถานะ :</Grid.Col>

                <Grid.Col span={9}>
                  <Select
                    data={[
                      {
                        label: 'เรียบร้อย',
                        value: 'true'
                      },
                      {
                        label: 'ยังไม่แก้ไข',
                        value: 'false'
                      }
                    ]}
                    onChange={handleStatus}
                    defaultValue={contact?.resolve === true ? 'true' : 'false'}
                    value={contact?.resolve === true ? 'true' : 'false'}
                  />
                </Grid.Col>
              </Grid>

              <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                <Button
                  onClick={() => {
                    navigate('/admin/contact')
                  }}
                >
                  กลับ
                </Button>

                <Button color="green" type="submit">
                  บันทึก
                </Button>
              </Flex>
            </Paper>
          </form>
        </>
      )}
    </AdminLayout>
  )
}
