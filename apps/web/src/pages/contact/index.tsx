import { RootLayout } from '@/components/Layout/Layout'
import { Button, Grid, Input, Textarea } from '@mantine/core'

export function ContactPage() {
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  return (
    <RootLayout>
      <h3>ติดต่อเรา</h3>

      <form onSubmit={handleSubmit} className='bg-white p-4 rounded-lg'>
        <Grid className="pb-4 ">
          <Grid.Col>
            {' '}
            <Input placeholder="ชื่อ" />
          </Grid.Col>
          <Grid.Col span={6}>
            {' '}
            <Input placeholder="อีเมล" />
          </Grid.Col>
          <Grid.Col span={6}>
            {' '}
            <Input placeholder="เบอร์โทรศัพท์" />
          </Grid.Col>
          <Grid.Col>
            {' '}
            <Input placeholder="หัวข้อ" />
          </Grid.Col>
          <Grid.Col>
            {' '}
            <Textarea placeholder="รายละเอียด" />
          </Grid.Col>
        </Grid>

        <Button color="green" type="submit">
          บันทึก
        </Button>
      </form>

      <Grid className="pt-4">
        <Grid.Col span={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.104472433829!2d100.8438527!3d19.3212724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31280989c0c41e37%3A0xaa8c15ef4809e8de!2sDear%20river%20cafe!5e0!3m2!1sth!2sth!4v1707921630661!5m2!1sth!2sth"
            width="100%"
            height="450"
            style={{
              border: 0
            }}
            loading="lazy"
          ></iframe>
        </Grid.Col>
        <Grid.Col span={6}>
          <p>117 ​หมู่7​ บ้านดอนสบเปือ ต.เปือ อ.เชียงกลาง จ.น่าน</p>
          <p>เบอร์โทร : 098 750 5614</p>
          <p>Email : theriverrunchiangklang@gmail.com</p>
          <p>Line : @theriverruns</p>
        </Grid.Col>
      </Grid>
    </RootLayout>
  )
}
