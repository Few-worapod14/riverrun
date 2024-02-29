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
          <p>{data.detail}</p>
        </div>
        {data.images?.[0]?.fullPath ? (
          <Image className="h-[350px]" src={data.images?.[0]?.fullPath} />
        ) : null}
      </div>

      <div className="bg-[#CCB494] border-4 border-indigo-600 p-4 absolute top-[50%] left-[35%]">
        หลังละ​ 5,400บาท มี 1 หลัง ค่าบริการนี้ เข้าพักได้ ​4 คนต่อ 1 ห้อง
      </div>

      <Link to={`/room/${data.slug}`}>ดูรายละเอียด </Link>
    </div>
  )
}
