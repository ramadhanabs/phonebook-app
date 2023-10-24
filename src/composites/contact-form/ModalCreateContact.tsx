import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import ContactForm from "@/components/modules/ContactForm/ContactForm"

interface ModalCreateContactProps {
  isOpen: boolean
  onClose: () => void
}

const ModalCreateContact = ({ isOpen, onClose }: ModalCreateContactProps) => {
  return (
    <BottomSheetModal title="Add New Contact" isOpen={isOpen} onClose={onClose}>
      <ContactForm />
    </BottomSheetModal>
  )
}

export default ModalCreateContact
