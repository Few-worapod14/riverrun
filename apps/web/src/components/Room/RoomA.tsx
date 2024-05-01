import { Image } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'
import { Link } from 'react-router-dom'

interface Props {
  data: RoomDto
}

export const RoomA = ({ data }: Props) => {
  return (
    <div className=" bg-white p-2 rounded-xl h-[400px] my-4">
      <div className="grid grid-cols-2 gap-2 ">
        <div>
          <p className="text-3xl font-bold">{data.name}</p>
          <p>฿ {data.pricePerNight}</p>
          <p>{data.detail}</p>
        </div>
        {data.images?.[0]?.fullPath ? (
          <div>
            <Image className="h-[350px]" src={data.images?.[0]?.fullPath} />
          </div>
        ) : null}
      </div>

      <div className="float-right">
        <Link to={`/room/${data.id}`}>ดูรายละเอียด </Link>
      </div>
    </div>
  )
}
