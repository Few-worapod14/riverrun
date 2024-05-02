import slide1 from '@/assets/slide1.jpeg'
import slide10 from '@/assets/slide10.jpeg'
import slide2 from '@/assets/slide2.jpeg'
import slide3 from '@/assets/slide3.jpeg'
import slide4 from '@/assets/slide4.jpeg'
import slide5 from '@/assets/slide5.jpeg'
import slide6 from '@/assets/slide6.jpeg'
import slide7 from '@/assets/slide7.jpeg'
import slide8 from '@/assets/slide8.jpeg'
import slide9 from '@/assets/slide9.jpeg'
import video from '@/assets/video.mp4'
import { BookingDate } from '@/components/BookingDate/BookingDate'
import { CarouselBox } from '@/components/Carousel/Carousel'
import { RootLayout } from '@/components/Layout/Layout'
import { Grid } from '@mantine/core'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const handleSearch = ({ startDate, endDate, room }) => {
    const params = {
      startDate: startDate,
      endDate: endDate,
      room: room
    }
    const query = queryString.stringify(params, {
      skipNull: true
    })
    return navigate(`/search?${query}`)
  }

  const images = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10]

  return (
    <RootLayout>
      <Grid className="pt-4">
        <Grid.Col span={12}>
          <CarouselBox data={images.map((x) => ({ image: x }))} height={400} />
        </Grid.Col>

        <Grid.Col span={12}>
          <BookingDate onSearch={handleSearch} />
        </Grid.Col>

        <Grid.Col span={12}>
          <video width="100%" height="100%" controls autoPlay playsInline loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </Grid.Col>

        <Grid.Col span={12}>
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
    </RootLayout>
  )
}
