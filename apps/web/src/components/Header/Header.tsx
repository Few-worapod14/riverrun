// import { Button, Container, Group, Image, Menu, rem ,Grid } from '@mantine/core'
// import {
//   IconPhone,
//   IconMail,
//   IconBrandInstagram,
//   IconBrandFacebook,
//   IconBrandAirbnb,
//   IconBrandBooking,
//   IconBrandLine,
// } from '@tabler/icons-react';
import { Image } from '@mantine/core'
import './Header.scss'
import { useState } from 'react'

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)


  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <Image w="56px" src="logo.png" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={()=>setOpenMenu(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
              Home
            </a>
            <a href="/accommodation" className="text-sm font-semibold leading-6 text-gray-900">
              Accommodations
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Contact
            </a>
            <a href="#" className="text-sm font-semibold text-white bg-emerald-300 p-4 rounded-xl">
              BOOK NOW
            </a>
          </div>
        </nav>

        {openMenu &&
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <Image w="56px" src="logo.png" />
              </a>
              <button type="button" onClick={()=>setOpenMenu(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </a>
                  <a
                    href="/accommodation"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Accommodations
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    BOOK NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </header>
    </>
  )
}
