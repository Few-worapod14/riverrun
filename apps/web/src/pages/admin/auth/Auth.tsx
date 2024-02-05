import { Button, Center, Flex, Input, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IResponseData } from '@riverrun/interface'
import { useNavigate } from 'react-router-dom'
import * as AuthService from '../../../services/auth'
import { AdminDTO, useStore } from '../../../store/store'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { setAdmin } = useStore()

  const api = AuthService

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const admin: IResponseData<AdminDTO> = await api.adminLogin(
      form.values.email,
      form.values.password
    )

    if (admin.success) {
      setAdmin(admin.data!)
      navigate('/admin')
    }
  }

  return (
    <Center h={400} mx="auto">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" justify="center" w={450}>
          <div className="mb-4">
            <Input.Wrapper label="Email" required>
              <Input placeholder="Email" mt="md" {...form.getInputProps('email')} />
            </Input.Wrapper>
          </div>

          <div className="mb-4">
            <PasswordInput
              mt="md"
              placeholder="Password"
              label="Password"
              {...form.getInputProps('password')}
              withAsterisk
            />
          </div>

          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Flex>
      </form>
    </Center>
  )
}
