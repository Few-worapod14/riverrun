import { Grid } from '@mantine/core'
import { IconArrowDown, IconArrowUp, IconBed } from '@tabler/icons-react'
import { useState } from 'react'
import { RootLayout } from '../../../components/Layout/Layout'

type AmenityItem = {
  id: number
  name: string
  icon: React.ElementType
}

type AmenityCategory = {
  id: number
  name: string
  amenities?: AmenityItem[]
}

const amenitiesData: AmenityCategory[] = [
  {
    id: 1,
    name: 'ห้องอาบน้ำ',
    amenities: [
      {
        id: 1,
        icon: IconBed,
        name: 'ห้องอาบน้ำแบบฝักบัว'
      },
      {
        id: 2,
        icon: IconBed,
        name: 'ห้องอาบน้ำแบบฝักบัว'
      }
    ]
  },
  {
    id: 2,
    name: 'ห้องครัว',
    amenities: [
      {
        id: 1,
        icon: IconBed,
        name: 'เตาไฟฟ้า'
      },
      {
        id: 2,
        icon: IconBed,
        name: 'ไมโครเวฟ'
      },
      {
        id: 3,
        icon: IconBed,
        name: 'ตู้เย็น'
      }
    ]
  },
  {
    id: 3,
    name: 'ห้องนอน',
    amenities: [
      {
        id: 1,
        icon: IconBed,
        name: 'เตียงควีนไซส์'
      },
      {
        id: 2,
        icon: IconBed,
        name: 'เตียงโซฟาเบด'
      },
      {
        id: 3,
        icon: IconBed,
        name: 'โซฟา'
      }
    ]
  }
]

export default function CottageHousePage() {
  const [openCategory, setOpenCategory] = useState<number | null>(null)

  const toggleCategory = (categoryId: number) => {
    setOpenCategory((prevOpenCategory) => (prevOpenCategory === categoryId ? null : categoryId))
  }

  return (
    <RootLayout>
      <Grid>
        <div className="w-full bg-white p-4 rounded-xl">
          <p>สิ่งอำนวยความสะดวกในห้อง</p>
          {amenitiesData.map((category) => (
            <details
              key={category.id}
              open={openCategory === category.id}
              onToggle={() => toggleCategory(category.id)}
              className="mb-4"
            >
              <summary className="flex items-center justify-between py-2 text-xl font-semibold">
                {category.name}
                {openCategory === category.id ? <IconArrowUp /> : <IconArrowDown />}
              </summary>
              <div className="grid grid-cols-2 gap-2">
                {category.amenities?.map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-2">
                    <amenity.icon />
                    <p>{amenity.name}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Grid>
    </RootLayout>
  )
}
