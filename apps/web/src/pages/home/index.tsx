import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import { BookingDate } from '../../components/BookingDate/BookingDate'
import { CarouselBox } from '../../components/Carousel/Carousel'
import { RootLayout } from '../../components/Layout/Layout'

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

  return (
    <RootLayout>
      <CarouselBox />
      <BookingDate onSearch={handleSearch} />
    </RootLayout>
  )
}
