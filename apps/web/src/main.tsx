import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
