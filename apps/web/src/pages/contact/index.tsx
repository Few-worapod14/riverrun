import { RootLayout } from '@/components/Layout/Layout'
import { Button, Container, Grid, Input, Textarea } from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLine,
  IconLine,
  IconMail,
  IconPhone,
  IconRecordMail
} from '@tabler/icons-react'

export function ContactPage() {
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  return (
    <RootLayout >
      <Container className="my-6 p-8 mx-auto max-w-full bg-white text-[#333] rounded-xl">
        <h1>Contact Us</h1>
        <Grid>
          <Grid.Col span={12}>
            <div>
              <h1 className="text-3xl font-extrabold">แบบฟอร์มติดต่อ</h1>
              <p className='text-md'>The River Runs ChiangKlang</p>
              <p className="text-sm text-gray-400 mt-3">
              กรุณากรอกข้อมูลส่วนตัวของท่าน เราจะติดต่อกลับโดยเร็วที่สุด
              ขอบพระคุณที่สนใจเข้าพักที่ The River Runs ChiangKlang
              </p>
            </div>
            <form className="ml-auo space-y-4">
              <Input
                type="text"
                placeholder="Name"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#A16207]"
              />
              <Input
                type="email"
                placeholder="Email"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#A16207]"
              />
              <Input
                type="text"
                placeholder="Subject"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-[#A16207]"
              />
              <Textarea
                placeholder="Message"
                className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 outline-[#A16207]"
              ></Textarea>
              <Button
                type="button"
                className="text-white bg-[#A16207] hover:bg-[#A16207] font-semibold rounded-md text-sm px-4 py-3 w-full"
              >
                Send
              </Button>
            </form>
          </Grid.Col>
          <Grid.Col span={12}>
            <div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Our Address</h3>
                <p>117 ​หมู่7​ บ้านดอนสบเปือ ต.เปือ อ.เชียงกลาง จ.น่าน</p>
              </div>
              <div className='flex items-center gap-2'>
                <IconPhone/>
                <p>098 750 5614</p>
              </div>
              <div className='flex items-center gap-2'>
                <IconMail/>
                <p>theriverrunchiangklang@gmail.com</p>
              </div>
              <div className='flex items-center gap-2'>
                <IconBrandLine/>
                <p>@theriverruns</p>
              </div>
              <div className='flex items-center gap-2'>
                <IconBrandFacebook/>
                <p>The River Runs ChiangKlang</p>
              </div>
              <div className='flex items-center gap-2'>
                <IconBrandInstagram/>
                <p>theriverrunschiangklang</p>
              </div>
              {/* <div className="flex items-center justify-start">
                <div className="flex justify-center">
                  <a
                    href="https://www.facebook.com/TheRiverRunsChiangKlang"
                    target="_blank"
                    className="mr-6 text-neutral-600 dark:text-neutral-200"
                  >
                    <IconBrandFacebook/>
                  </a>

                  <a
                    href="https://www.instagram.com/theriverrunschiangklang/"
                    target="_blank"
                    className="mr-6 text-neutral-600 dark:text-neutral-200"
                  >
                    <IconBrandInstagram/>
                  </a>
                </div>
              </div> */}
            </div>
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
        </Grid>
      </Container>
    </RootLayout>
  )
}
