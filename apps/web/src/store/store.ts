import dayjs from 'dayjs'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AdminDTO = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  accessToken: string
}

export type UserDTO = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  accessToken: string
}

export type BookingDTO = {
  timeBooking: Date
  startDate: Date
  endDate: Date
  roomId: number
}

interface StoreState {
  timeBooking: Date | null
  startDate: Date | null
  endDate: Date | null
  setUser: (user: UserDTO | null) => void
  user: UserDTO | null
  admin: AdminDTO | null
  setAdmin: (user: AdminDTO | null) => void
  roomId: number | null
  setBooking: (startDate: Date, endDate: Date, roomId: number) => void
}

export interface AuthRequestDTO {
  username: string
  password: string
}

export const localStorageName = 'riverrun'

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        timeBooking: null,
        startDate: null,
        endDate: null,
        roomId: null,
        setBooking: (startDate: Date, endDate: Date, roomId: number) => {
          set(() => {
            return {
              timeBooking: dayjs().toDate(),
              startDate: startDate,
              endDate: endDate,
              roomId: roomId
            }
          })
        },
        user: null,
        setUser: (user: UserDTO | null) => set(() => ({ user: user })),
        admin: null,
        setAdmin: (admin: AdminDTO | null) => set(() => ({ admin: admin }))
      }),
      {
        name: localStorageName
      }
    )
  )
)
