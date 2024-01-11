import { Button, Center, Flex, Input, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ResponseData } from '@riverrun/interface'
import { useNavigate } from 'react-router-dom'
import * as AuthService from '../../../services/auth'
import { AuthDTO, useStore } from '../../../store/store'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useStore()

  const api = AuthService

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    }
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const user = await api.login(form.values.username, form.values.password)

    if (user.success) {
      const res = user as ResponseData<AuthDTO>
      setUser(res.data!.user)
      setToken(res.data!.accessToken)
      navigate('/')
    }
  }

  return (
    <Center h={400} mx="auto">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" justify="center" w={450}>
          <div className="mb-4">
            <Input.Wrapper label="Username" required>
              <Input placeholder="Username" mt="md" {...form.getInputProps('username')} />
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
