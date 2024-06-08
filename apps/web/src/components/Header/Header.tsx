import logo from '@/assets/logo.png'
import { Image, Menu } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.scss'

const routeMenu = {
  menu: [
    { title: 'หน้าแรก', path: '/', icon: '' },
    {
      title: 'ห้องพัก',
      submenu: [
        { title: 'ห้องพัก', path: '/room', icon: '' },
        { title: 'จองห้องพัก', path: '/booking', icon: '' }
      ],
      path: '/booking',
      icon: ''
    },
    { title: 'ติดต่อ', path: '/contact', icon: '' }
  ]
}

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [onTop, setOnTop] = useState<boolean>(true)
  const menuComponent = routeMenu.menu.map((i) => {
    const menuColor = location.pathname == i.path
    return (
      <Menu
        key={i.title}
        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        <Menu.Target>
          <Link
            key={i.title}
            to={i.path}
            className={`text-sm font-semibold leading-6 ${
              menuColor ? 'text-brown' : 'text-lightbrown' || ''
            }`}
          >
            {i.title}
          </Link>
        </Menu.Target>
        {i?.submenu && (
          <Menu.Dropdown>
            <Menu.Label>{i.title}</Menu.Label>
            {i.submenu?.map((sub) => (
              <Menu.Item key={sub.title}>
                <Link className={menuColor ? 'text-brown' : 'text-lightbrown'} to={sub.path}>
                  {sub.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        )}
      </Menu>
    )
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setOnTop(true)
      else setOnTop(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <>
      <header
        className="header"
        style={
          {
            // position: 'fixed', width: '100%', top: 0, zIndex: 10
          }
        }
        // className={headerStyleBG}
      >

        <nav className="mx-auto flex items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <Image w="72px" src={logo} />
            </a>
            <div className="ml-2 ">
              <h3 className="mb-2 flex flex-col items-end text-brown">
                THE RIVER RUNS
                <span className="text-sm font-normal text-lightbrown">CHIANG KLANG</span>
              </h3>
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 border-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">{menuComponent}</div>
        </nav>

        {openMenu && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <Image w="56px" src={logo} />
                </a>
                <div className="ml-2 ">
              <h3 className="mb-2 flex flex-col items-start text-brown">
                THE RIVER RUNS
                <span className="text-sm font-normal text-lightbrown">CHIANG KLANG</span>
              </h3>
            </div>
                <button
                  type="button"
                  onClick={() => setOpenMenu(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 border-none"
                >
                  <span className="sr-only">ปิด</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brown hover:bg-gray-50"
                    >
                      หน้าแรก
                    </Link>
                    <Link
                      to="/room"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brown hover:bg-gray-50"
                    >
                      ห้องพัก
                    </Link>
                    <Link
                      to={'/booking'}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-brown hover:bg-gray-50"
                    >
                      จองห้องพัก
                    </Link>
                    <Link
                      to="/contact"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brown hover:bg-gray-50"
                    >
                      ติดต่อเรา
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
