export const convertBookingStatus = (status: string) => {
  switch (status) {
    case 'BOOKING':
      return 'จอง'
    case 'PAID':
      return 'จ่ายเงินเรียบร้อย'
    case 'DONE':
      return 'เรียบร้อย'
    default:
      return 'ยกเลิก'
  }
}
