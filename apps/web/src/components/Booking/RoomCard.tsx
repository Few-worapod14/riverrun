import { Carousel } from '@mantine/carousel'
import {
  AspectRatio,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Text,
  rem
} from '@mantine/core'
import 'dayjs/locale/th'
import { useEffect, useState } from 'react'

const ImageOverlay = ({ path, ...props }) => {
  const { key, radius, maw, className } = props
  // const [hover, setHover] = useState(false)
  return (
    <AspectRatio
      className="cursor-pointer"
      onClick={() => {
        props?.onClick(props?.imageDetail)
      }}
      ratio={4 / 3}
      maw={maw || 400}
      // mx="auto"
      pos="relative"
    >
      <Image className={'hover:opacity-70' + className} src={path} {...{ radius, key }} />
    </AspectRatio>
  )
}

const ModalPreviewImage = ({ images, clickID, opened, title, onClose }) => {
  const [preview, setPreview] = useState({ id: 0 })

  const handlePreview = (_img) => {
    setPreview(_img)
  }

  useEffect(() => {
    handlePreview(clickID)
  }, [clickID])

  return (
    opened && (
      <Modal opened={opened} onClose={onClose} title={title} centered size="lg">

        <Carousel
          height={350}
          slideGap="xl"
          initialSlide={preview?.id}
          controlsOffset="xs"
          controlSize={25}
          loop
          draggable={false}
        >
          {images.map((x) => (
            <Image
              style={{ height: rem(350), width: '100%', objectFit: 'cover' }}
              src={x?.fullPath}
            />
          ))}
        </Carousel>

        <SimpleGrid mt="sm" cols={6} verticalSpacing="xs" spacing="xs">
          {images?.map((val) => (
            <ImageOverlay
              className={preview?.id === val.id && ' opacity-65'}
              maw={150}
              path={val?.fullPath}
              imageDetail={val}
              onClick={handlePreview}
            />
          ))}
        </SimpleGrid>
      </Modal>
    )
  )
}

export const RoomCard = ({ detail, handleRoomBooking, selected }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState()


  const viewMoreImages = (imgDetail) => {

    setPreviewImage(imgDetail)
    setOpened(Object.keys(imgDetail).length > 0)
  }

  useEffect(() => {}, [detail, selected])

  return (
    <Card
      key={detail.id}
      withBorder
      shadow="sm"
      radius="md"
      p="sm"
      mb="md"
      style={{ backgroundColor: selected?.id === detail?.id ? '#F6EEE0' : 'transparent' }}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} size="lg" className="text-brown">
            {detail?.name}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section mt="sm" mb="sm">
        <Grid gutter="xs" ml="sm">
          <Grid.Col span={{ md: 6, sm: 12 }} className="cursor-pointer">
            {/* <Image className="hover:opacity-60" src={detail?.images?.[0]?.fullPath} /> */}

            <ImageOverlay
              path={detail?.images?.[0]?.fullPath}
              imageDetail={detail?.images?.[0]}
              onClick={viewMoreImages}
            />
            <SimpleGrid cols={3} mt="sm">
              {detail.images.map((image) => (
                <ImageOverlay
                  path={image.fullPath}
                  imageDetail={image}
                  key={image.id}
                  radius="sm"
                  onClick={viewMoreImages}
                />
              ))}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: 6 }}>
            <Text size="sm" fw={500}>
              จำนวนผู้เข้าพัก: {detail.amount}
              {detail?.detail && <span className="ml-2">({detail?.detail})</span>}
            </Text>
            <Text size="sm" fw={500}>
              สิ่งอำนวยความสะดวกในห้อง
            </Text>
            <SimpleGrid cols={2} verticalSpacing="xs" spacing="xs">
              {detail?.amenities?.map((val) =>
                val?.lists?.map((list) => (
                  <Text className="list-disc" size="xs">
                    &#x2022; {list?.name}
                  </Text>
                ))
              )}
            </SimpleGrid>
            <div className="text-center">
              <Text size="sm">ราคา/คืน</Text>
              <Text fz={28} fw={600}>
                {detail?.pricePerNight?.toLocaleString()} บาท
              </Text>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                size="lg"
                style={{ width: '80%' }}
                color="#C38370"
                onClick={() => handleRoomBooking(detail)}
              >
                <span style={{ color: '#F6EEE0' }}>จองห้องพัก</span>
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </Card.Section>

      {opened && (
        <ModalPreviewImage
          images={detail.images}
          clickID={previewImage}
          {...{ opened, title: detail?.name, onClose: () => viewMoreImages({}) }}
        />
      )}
    </Card>
  )
}
