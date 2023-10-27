import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import ContactForm, { ContactFormRef } from "@/components/modules/ContactForm/ContactForm"
import { useEffect, useRef } from "react"

interface ModalCreateContactProps {
  isOpen: boolean
  onClose: () => void
}

const ModalCreateContact = ({ isOpen, onClose }: ModalCreateContactProps) => {
  const formRef = useRef<ContactFormRef>(null)

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.resetForm()
    }
  }, [isOpen])

  return (
    <BottomSheetModal title="Add New Contact" isOpen={isOpen} onClose={onClose} data-testid="modal-create-contact">
      <ContactForm ref={formRef} onClose={onClose} />
    </BottomSheetModal>
  )
}

export default ModalCreateContact
