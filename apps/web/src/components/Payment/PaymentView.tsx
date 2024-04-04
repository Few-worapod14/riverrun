import { Grid, Image } from '@mantine/core'
import { PaymentDto } from '@riverrun/interface'

type Props = {
  payments: PaymentDto[]
}

export const PaymentView = ({ payments }: Props) => {
  return payments.map((payment) => {
    return (
      <>
        <Grid key={payment.id}>
          <Grid.Col span={6}>ธนาคาร : {payment.bank}</Grid.Col>
          <Grid.Col span={6}>สาขา : {payment.branch}</Grid.Col>
          <Grid.Col span={6}>ชื่อบัญชี : {payment.name}</Grid.Col>
          <Grid.Col span={6}>เลขบัญชี : {payment.no}</Grid.Col>
          <Grid.Col span={6}>
            <Image radius="md" src={payment.fullPath} />
          </Grid.Col>
        </Grid>
        <hr />
      </>
    )
  })
}
