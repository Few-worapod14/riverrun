import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AdminDTO = {
  id: string
  username: string
  mobile: string
  firstName: string
  lastName: string
  accessToken: string
}

export type UserDTO = {
  id: string
  email: string
  firstName: string
  lastName: string
  accessToken: string
}

interface StoreState {
  admin: AdminDTO | null
  user: UserDTO | null
  setUser: (user: UserDTO | null) => void
}

export interface AuthDTO {
  accessToken: string
  refreshToken: string
  user: UserDTO
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
        admin: null,
        user: null,
        setUser: (user: UserDTO | null) => set(() => ({ user: user })),
        setAdmin: (admin: AdminDTO | null) => set(() => ({ admin: admin }))
      }),
      {
        name: localStorageName
      }
    )
  )
)
