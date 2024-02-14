import { Grid, Paper } from '@mantine/core'
import { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'

export default function DashboardPage() {
  const [countCustomer, setCountCustomer] = useState(0)
  const [countBooking, setCountBooking] = useState(0)

  useEffect(() => {
    handleGetAllCustomer()
    handleGetAllBooking()
  }, [])

  const handleGetAllCustomer = async () => {}

  const handleGetAllBooking = async () => {}

  return (
    <AdminLayout>
      <Paper shadow="xs" p="xl">
        <Grid>
          <Grid.Col span={6}>จำนวนลูกค้า : {countCustomer}</Grid.Col>

          <Grid.Col span={6}>จำนวนการจองเดือนนี้ : {countBooking}</Grid.Col>
        </Grid>
      </Paper>
    </AdminLayout>
  )
}
