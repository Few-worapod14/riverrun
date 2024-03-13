import { Carousel } from '@mantine/carousel'
import { Card, Grid, rem } from '@mantine/core'
import './Carousel.scss'

type image = {
  image: string
}

type Props = {
  data: image[]
  height: number
}

export const CarouselBox = ({ data, height }: Props) => {
  const slides = data?.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card>
        <Card.Section>
          <img
            src={item.image}
            style={{ height: rem(height), width: '100%', objectFit: 'cover' }}
          />
        </Card.Section>
      </Card>
    </Carousel.Slide>
  ))

  return (
    <Grid className="mb-4">
      <Grid.Col>
        <Carousel
          height={height}
          slideGap="xl"
          controlsOffset="xs"
          controlSize={25}
          loop
          draggable={false}
        >
          {slides}
        </Carousel>
      </Grid.Col>
    </Grid>
  )
}
