import { Button, Container, Flex, Image } from '@mantine/core'

import './Header.scss'

export const Header = () => {
  return (
    <div className="min-h-24 header">
      <Container>
        <Image w="100px" src="logo.png" />

        <Flex>
          <Button>จอง</Button>
        </Flex>
      </Container>
    </div>
  )
}
