/** @jsxRuntime classic */
/** @jsx jsx */

import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import ContactCard from "@/components/modules/ContactCard/ContactCard"
import useDisclosure from "@/hooks/useDisclosure"
import { jsx, css } from "@emotion/react"
import React from "react"
import ModalContactDetail from "./ModalContactDetail"

const baseContactListStyle = css`
  background: #fafafa;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  button.load-more {
    background: #00aa5b;
    border-radius: 8px;
    width: max-content;
    color: white;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;

    margin-left: auto;
    margin-right: auto;
  }
`

export type ContactListType = "home" | "contact-form"

interface ContactListProps {
  count?: number
  isWithPagination?: boolean
  type?: ContactListType
}

const ContactList = (props: ContactListProps) => {
  const { count, isWithPagination, type } = props
  const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure()
  return (
    <>
      <div css={baseContactListStyle}>
        {Array.from(Array(count).keys()).map((_, idx) => (
          <ContactCard key={idx} type={type} onOpenModal={onOpenDetail} />
        ))}

        {isWithPagination && <button className="load-more">Load More</button>}
      </div>

      <ModalContactDetail isOpen={isOpenDetail} onClose={onCloseDetail} type={type} />
    </>
  )
}

export default ContactList
