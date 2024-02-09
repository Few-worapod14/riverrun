import { Button, Flex, Modal } from '@mantine/core'

interface Props {
  title: string
  message: string
  isOpen: boolean
  close: () => void
  confirm: () => void
}

export const ConfirmModalBox: React.FC<Props> = ({ confirm, title, message, isOpen, close }) => {
  return (
    <Modal opened={isOpen} onClose={close} title={title} centered>
      <p>{message}</p>

      <Flex gap="md" justify="center" direction="row" wrap="wrap">
        <Button color="gray" onClick={close}>
          ยกเลิก
        </Button>

        <Button color="red" onClick={confirm}>
          ยืนยัน
        </Button>
      </Flex>
    </Modal>
  )
}
