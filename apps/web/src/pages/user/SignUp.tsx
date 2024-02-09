import { Button, Center, Flex, Grid, Input, PasswordInput } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { CustomerCreateDto } from '@riverrun/interface'
import { useNavigate } from 'react-router-dom'
import { RootLayout } from '../../components/Layout/Layout'
import * as UserService from '../../services/user.ts'

import './Signup.scss'

export default function SignUpPage() {
  const navigate = useNavigate()

  const init: CustomerCreateDto = {
    email: '',
    password: '',
    mobile: '',
    firstName: '',
    lastName: ''
  }

  const form = useForm({
    initialValues: init,
    validate: {
      email: isEmail('Username is required'),
      password: isNotEmpty('Password is required'),
      mobile: isNotEmpty('Mobile is required'),
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required')
    }
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    form.validate()
    if (form.isValid()) {
      const api = UserService
      const user = await api.create(form.values)

      if (user.success) {
        navigate('/login')
      }
    }
  }

  return (
    <RootLayout>
      <Center className="login py-4" mx="auto">
        <Flex direction="column" justify="center" w={450}>
          <div className="mb-2">
            <Grid justify="center">
              <h4>The River Runs Chiang Klang</h4>
            </Grid>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input.Wrapper label="อีเมล" required>
                <Input type="email" placeholder="อีเมล" mt="md" {...form.getInputProps('email')} />
              </Input.Wrapper>
            </div>

            <div className="mb-4">
              <PasswordInput
                mt="md"
                placeholder="รหัสผ่านความยาวอย่างน้อย 8 ตัวอักษร"
                label="รหัสผ่าน"
                {...form.getInputProps('password')}
                error={form.errors.password ? true : false}
              />
            </div>

            <div className="mb-4">
              <Input.Wrapper label="เบอร์โทรศัพท์" required>
                <Input placeholder="เบอร์โทรศัพท์" mt="md" {...form.getInputProps('mobile')} />
              </Input.Wrapper>
            </div>

            <div className="mb-4">
              <Input.Wrapper label="ชื่อ" required>
                <Input placeholder="ชื่อ" mt="md" {...form.getInputProps('firstName')} />
              </Input.Wrapper>
            </div>

            <div className="mb-4">
              <Input.Wrapper label="นามสกุล" required>
                <Input placeholder="นามสกุล" mt="md" {...form.getInputProps('lastName')} />
              </Input.Wrapper>
            </div>

            <div className="mb-4">
              <Button type="submit" w={'100%'} onClick={handleSubmit}>
                สมัครสมาชิก
              </Button>
            </div>
          </form>
        </Flex>
      </Center>
    </RootLayout>
  )
}
