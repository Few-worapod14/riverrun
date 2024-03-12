import { Container } from '@mantine/core'
import '@mantine/core/styles.css'
import React from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './Layout.scss'

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="main">
        <Container>
          <div className="py-4">{children}</div>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
