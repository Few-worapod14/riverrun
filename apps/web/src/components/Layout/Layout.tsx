import { Container } from '@mantine/core'
import '@mantine/core/styles.css'
import React from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Container>
        <div className="py-4">{children}</div>
      </Container>
      <Footer />
    </>
  )
}
