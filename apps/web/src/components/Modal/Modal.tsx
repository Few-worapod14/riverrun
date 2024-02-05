import { Modal } from '@mantine/core'

interface Props {
  children: React.ReactNode
  title: string
  isOpen: boolean
  onClose: () => void
}

export const ModalBox = ({ children, title, isOpen, onClose }: Props) => {
  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onClose()
      }}
      title={title}
      centered
    >
      {children}
    </Modal>
  )
}
