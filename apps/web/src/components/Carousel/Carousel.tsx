import { Carousel } from '@mantine/carousel'
import { Card, Grid, Image } from '@mantine/core'
import './Carousel.scss'

const data = [
  {
    image: 'images/home/1.jpg'
  },
  {
    image: 'images/home/2.jpg'
  },
  {
    image: 'images/home/3.jpg'
  },
  {
    image: 'images/home/4.jpg'
  },
  {
    image: 'images/home/5.jpg'
  }
]

export const CarouselBox = () => {
  const slides = data.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card>
        <Card.Section>
          <Image fit="fill" src={item.image} />
        </Card.Section>
      </Card>
    </Carousel.Slide>
  ))

  return (
    <Grid className="mb-4">
      <Grid.Col>
        <Carousel
          loop
          height={300}
          // slideSize={{ base: '100%', sm: '50%' }}
          // slideGap={{ base: 'xl', sm: 2 }}
          // align="start"
        >
          {slides}
        </Carousel>
      </Grid.Col>
    </Grid>
  )
}
