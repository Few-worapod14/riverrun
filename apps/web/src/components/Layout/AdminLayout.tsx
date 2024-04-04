import logo from '@/assets/logo.png'
import { useStore } from '@/store/store'
import { AppShell, Burger, Center, Grid, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import './AdminLayout.scss'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { setAdmin } = useStore()
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <AppShell.Navbar p="md" className="sidebar">
        <AppShell.Section>
          <Grid className="nav">
            <Grid.Col>
              <Center>
                <img height={100} src={logo} />
              </Center>
              <NavLink label="แดชบอร์ด" onClick={() => navigate('/admin')} />
              <NavLink label="จัดการจองห้อง" onClick={() => navigate('/admin/booking')} />
              <NavLink label="จัดการห้องพัก" onClick={() => navigate('/admin/room')} />
              <NavLink label="จัดการผู้ใช้" onClick={() => navigate('/admin/customer')} />
              <NavLink label="จัดการผู้ติดต่อ" onClick={() => navigate('/admin/contact')} />
              <NavLink label="จัดการบัญชีธนาคาร" onClick={() => navigate('/admin/payment')} />
              <NavLink
                label="ออกจากระบบ"
                onClick={() => {
                  setAdmin(null)
                }}
              />
            </Grid.Col>
          </Grid>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className="main">{children}</AppShell.Main>
    </AppShell>
  )
}
