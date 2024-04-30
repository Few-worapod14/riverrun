import AdminLayout from '@/components/Layout/AdminLayout'
import * as adminUser from '@/services/admin-user'
import { MODE } from '@/utils/booking'
import { Button, Flex, Grid, Input, LoadingOverlay, Paper, PasswordInput } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { AdminDto } from '@riverrun/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  mode: string
}

export default function AdminUserEditPage({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<AdminDto | null>(null)

  const initData = {
    username: null,
    password: null,
    email: null,
    firstName: null,
    lastName: null
  }

  const form = useForm({
    initialValues: initData,
    validate: {
      username: isNotEmpty(),
      password: isNotEmpty(),
      email: isEmail(),
      firstName: isNotEmpty(),
      lastName: isNotEmpty()
    }
  })

  useEffect(() => {
    if (mode === MODE.EDIT) {
      handleGetById()
    } else {
      setLoading(false)
    }
  }, [])

  const handleGetById = async () => {
    const res = await adminUser.getById(Number(id))
    if (res.success) {
      setLoading(false)
      delete res.data.password
      form.setValues(res.data)
      setUser(res.data!)
    }
  }

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (form.validate()) {
      const data = form.values
      const res = await adminUser.create(data)
      if (res.success) {
        navigate('/admin/user')
      }
    }
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (form.isValid('email') && form.isValid('firstName') && form.isValid('lastName')) {
      const data = form.values
      if (data?.password?.length === 0) {
        delete data.password
      }
      const res = await adminUser.update(Number(id), data)
      if (res.success) {
        navigate('/admin/user')
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

            <form onSubmit={mode === MODE.EDIT ? handleUpdate : handleCreate}>
              <Grid className="mb-5">
                <Grid.Col span={3}>Username :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={user?.username}
                    value={user?.username}
                    {...form.getInputProps('username')}
                    disabled={mode === MODE.EDIT ?? false}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>password :</Grid.Col>
                <Grid.Col span={9}>
                  <PasswordInput {...form.getInputProps('password')} />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>ชื่อ :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={user?.firstName}
                    value={user?.firstName}
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>นามสกุล :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={user?.lastName}
                    value={user?.lastName}
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
              </Grid>

              <Grid className="mb-5">
                <Grid.Col span={3}>อีเมล์ :</Grid.Col>
                <Grid.Col span={9}>
                  <Input
                    defaultValue={user?.email}
                    value={user?.email}
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
              </Grid>

              <Flex gap="md" direction="row" wrap="wrap" className="mb-5">
                <Button
                  onClick={() => {
                    navigate('/admin/user')
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
