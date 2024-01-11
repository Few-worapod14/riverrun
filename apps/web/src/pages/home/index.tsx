import { BookingDate } from '../../components/BookingDate/BookingDate'
import { CarouselBox } from '../../components/Carousel/Carousel'
import { RootLayout } from '../../components/Layout/Layout'

export default function HomePage() {
  return (
    <RootLayout>
      <CarouselBox />
      <BookingDate />
    </RootLayout>
  )
}
