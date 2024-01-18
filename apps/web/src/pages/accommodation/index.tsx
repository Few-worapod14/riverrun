import { RootLayout } from '../../components/Layout/Layout'
import { Image, NavLink } from '@mantine/core'

export default function AccommodationPage() {
  return (
    <RootLayout>
      <div className=' bg-white p-2 rounded-xl h-[400px] my-4'>
        <div className='grid grid-cols-2 gap-2 '>
          <div>
            <p className='text-3xl font-bold'>The Cottage House</p>
            <p> Cottage House ที่ได้รับแรงบันดาลใจมาจาก อาคารโรงบ่มยาในสมัยก่อน ออกแบบใหม่เป็นบ้านก่ออิฐโครงสร้างไม้ทั้งหลัง
              ให้ความรู้สึกอบอุ่นและผ่อนคลายตั้งแต่เริ่มเปิดประตูเข้าไป บ้านหลังนี้ได้วิวแม่น้ำน่านแบบ 180 องศา และภายในมี 2ชั้น ชั้นล่างเป็นเตียงเดี่ยว
              และ บนชั้นลอยไม้เตียงคู่ เมื่อเดินขึ้นบันไดไปจะสัมผัสถึงความสบายบนเตียงนอน โคมไฟและฝ้าเพดานไม้ สร้างความรู้สึกผ่อนคลาย และเมื่อมองออกไปนอกหน้าต่าง
              คุณรู้สึกเหมือนเป็นนกน้อยที่นอนอยู่ในรัง ท่ามกลางธรรมชาติที่อบอุ่น</p>
          </div>
          <Image className='h-[350px]' src="cottage.jpg" />
        </div>

        <div className='bg-[#CCB494] border-4 border-indigo-600 p-4 absolute top-[50%] left-[35%]'>
          หลังละ​ 5,400บาท มี 1 หลัง ค่าบริการนี้ เข้าพักได้ ​4 คนต่อ 1 ห้อง
        </div>

        <NavLink label="read more" href="/accommodation/the-cottage-house" />
      </div>


      <div className=' bg-white p-2 rounded-xl h-[400px] my-4 relative'>
        <div className='grid grid-cols-2 gap-2 '>
          <Image className='h-[350px]' src="cabin.jpg" />
          <div>
            <p className='text-3xl font-bold'>Cabin House</p>
            <p> ห้องพักเราเป็นห้องพักที่เน้นการอยู่กับธรรมชาติ โดยเราออกแบบให้ช่องกระจก​บานกว้าง​ เพิ่ม​ Space ให้กับบ้าน​
              เมื่อเปิดม่านเราสามารถมองออกไปเห็นต้นไม้ใบหญ้า​ เปิดหน้าต่างให้ลมพัดเข้ามาได้สบาย​ บ้านเรามี​
              Sky​lightหลังคาใส​ให้เปิดม่านหลังคานอนดูดาวตอนกลางคืนและ​ สายฝนในหน้าฝน​ อย่างชุ่มฉ่ำบนเตียงนอน​
              หลังคาผ้าใบทำให้เสียงฝนนุ่มทุ้มชวนให้หลับสบาย มี wifi เชื่อมต่อกับโลกภายนอกค่ะ</p>
          </div>
        </div>

        <div className='bg-[#CCB494] border-4 border-indigo-600 p-4 absolute top-[80%] left-[10%]'>
          หลังละ​ 2,200บาท มี 1 หลัง ค่าบริการนี้ เข้าพักได้ 2 คนต่อ 1 ห้อง
        </div>

        <NavLink label="read more"/>
      </div>

    </RootLayout>
  )
}
