import { useState } from "react"

export type useDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export default function useDisclosure(defaultValue?: boolean): useDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultValue || false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const onToggle = () => setIsOpen(!isOpen)

  return { isOpen, onOpen, onClose, onToggle }
}
