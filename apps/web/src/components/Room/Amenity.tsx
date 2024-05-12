import { Button, Grid, Input } from '@mantine/core'
import { AmenityDto, AmenityListDto } from '@riverrun/interface'

type Props = {
  amenities: AmenityDto[]
  amenity: AmenityDto
  index: number
  setAmenities: (amenities: AmenityDto[]) => void
}

export const Amenity = ({ amenities, amenity, index, setAmenities }: Props) => {
  const initAmenityLists: AmenityListDto[] = [
    {
      name: ''
    }
  ]

  const handleDeleteAmenity = (index: number) => {
    const update = amenities.filter((_, i) => i !== index)
    setAmenities(update)
  }

  const handleAddAmenityList = (index: number) => {
    const add = amenities.map((x, i) => {
      if (i === index) {
        const lists = x.lists.concat(initAmenityLists)

        return {
          ...x,
          lists: lists
        }
      }
      return x
    })

    setAmenities(add)
  }

  const handleDeleteAmenityList = (index: number, listIndex: number) => {
    const update = amenities.map((x, i) => {
      if (i === index) {
        const lists = x.lists.filter((_, idx) => idx !== listIndex)

        return {
          ...x,
          lists: lists
        }
      }
      return x
    })
    setAmenities(update)
  }

  const handleChangeValue = (index: number, value: string) => {
    const update = amenities.map((x, i) => {
      if (i === index) {
        return {
          name: value,
          lists: x.lists
        }
      }
      return x
    })
    setAmenities(update)
  }

  const handleChangeListValue = (index: number, listIndex: number, value) => {
    const update = amenities.map((x, i) => {
      if (i === index) {
        const amenity = x.lists.map((list, idx) => {
          if (idx === listIndex) {
            return {
              name: value
            }
          }
          return list
        })
        return {
          name: x.name,
          lists: amenity
        }
      }
      return x
    })
    setAmenities(update)
  }

  return (
    <div>
      <Grid>
        <Grid.Col span={4}>
          <Input.Wrapper label="ประเภทอำนวยความสะดวก">
            <Input
              value={amenity?.name}
              defaultValue={amenity?.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                console.log('---', event.currentTarget.value)
                handleChangeValue(index, event.currentTarget.value)
              }}
              // {...form.getInputProps(`amenities[${index}].name`)}
            />
          </Input.Wrapper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Button onClick={() => handleDeleteAmenity(index)} color="red">
            ลบ
          </Button>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Button onClick={() => handleAddAmenityList(index)} color="teal">
            เพิ่มรายการ
          </Button>
        </Grid.Col>
      </Grid>

      {amenity?.lists?.map((list: AmenityListDto, i: number) => {
        return (
          <ul key={i}>
            <li>
              <Grid>
                <Grid.Col span={4}>
                  <Input
                    value={list?.name}
                    defaultValue={list?.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      console.log('---', event.currentTarget.value)
                      handleChangeListValue(index, i, event.currentTarget.value)
                    }}
                    // {...form.getInputProps(`amenities[${index}].lists[${i}].name`)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button onClick={() => handleDeleteAmenityList(index, i)} color="red">
                    ลบ
                  </Button>
                </Grid.Col>
              </Grid>
            </li>
          </ul>
        )
      })}
      <hr />
    </div>
  )
}
