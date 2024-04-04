import { Image } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { Link } from 'react-router-dom'

interface Props {
  data: RoomDto
}

export const RoomB = ({ data }: Props) => {
  return (
    <div className=" bg-white p-2 rounded-xl h-[400px] my-4 relative">
      <div className="grid grid-cols-2 gap-2 ">
        {data.images?.[0]?.fullPath ? (
          <div className="">
            <Image className="h-[350px]" src={data.images?.[0]?.fullPath} />
          </div>
        ) : null}
        <div>
          <p className="text-3xl font-bold">{data.name}</p>
          <p>฿ {data.pricePerNight}</p>
          <p>{data.detail}</p>
        </div>
      </div>

      <div>
        <Link to={`/room/${data.slug}`}>ดูรายละเอียด </Link>
      </div>
    </div>
  )
}
