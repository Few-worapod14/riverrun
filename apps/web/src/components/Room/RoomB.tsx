import { Image, NavLink } from '@mantine/core'
import { RoomDto } from '@riverrun/interface'

interface Props {
  data: RoomDto
}

export const RoomB = ({ data }: Props) => {
  return (
    <div className=" bg-white p-2 rounded-xl h-[400px] my-4 relative">
      <div className="grid grid-cols-2 gap-2 ">
        <Image className="h-[350px]" src="cabin.jpg" />
        <div>
          <p className="text-3xl font-bold">Cabin House</p>
          <p>
            {' '}
            ห้องพักเราเป็นห้องพักที่เน้นการอยู่กับธรรมชาติ โดยเราออกแบบให้ช่องกระจก​บานกว้าง​ เพิ่ม​
            Space ให้กับบ้าน​ เมื่อเปิดม่านเราสามารถมองออกไปเห็นต้นไม้ใบหญ้า​
            เปิดหน้าต่างให้ลมพัดเข้ามาได้สบาย​ บ้านเรามี​
            Sky​lightหลังคาใส​ให้เปิดม่านหลังคานอนดูดาวตอนกลางคืนและ​ สายฝนในหน้าฝน​
            อย่างชุ่มฉ่ำบนเตียงนอน​ หลังคาผ้าใบทำให้เสียงฝนนุ่มทุ้มชวนให้หลับสบาย มี wifi
            เชื่อมต่อกับโลกภายนอกค่ะ
          </p>
        </div>
      </div>

      <div className="bg-[#CCB494] border-4 border-indigo-600 p-4 absolute top-[80%] left-[10%]">
        หลังละ​ 2,200บาท มี 1 หลัง ค่าบริการนี้ เข้าพักได้ 2 คนต่อ 1 ห้อง
      </div>

      <NavLink label="read more" />
    </div>
  )
}
