/** @jsxRuntime classic */
/** @jsx jsx */

import ContactCard, { ContactCardLoader } from "@/components/modules/ContactCard/ContactCard"
import useDisclosure from "@/hooks/useDisclosure"
import { IContact } from "@/types"
import { jsx, css } from "@emotion/react"
import React, { useState } from "react"
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

export type ContactListType = "home" | "favorite"

interface ContactListProps {
  isWithPagination?: boolean
  type?: ContactListType
  data?: IContact[]
  isLoading: boolean
}

const ContactListLoader = () => {
  return (
    <div css={baseContactListStyle}>
      {Array.from(Array(5).keys()).map((_, idx) => (
        <ContactCardLoader key={idx} />
      ))}
    </div>
  )
}

const ContactList = (props: ContactListProps) => {
  const { data, isWithPagination, type, isLoading } = props
  const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure()

  const [selectedContact, setSelectedContact] = useState<IContact | undefined>(undefined)

  const handleOpenModal = (contact: IContact) => {
    setSelectedContact(contact)
    onOpenDetail()
  }

  const handleCloseModal = () => {}

  if (isLoading) return <ContactListLoader />

  return (
    <>
      <div css={baseContactListStyle}>
        {data?.map((item, idx) => (
          <ContactCard
            data={item}
            key={idx}
            type={type}
            onOpenModal={() => handleOpenModal(item)}
          />
        ))}
        {isWithPagination && <button className="load-more">Load More</button>}
      </div>

      <ModalContactDetail
        selectedContact={selectedContact}
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        type={type}
      />
    </>
  )
}

export default ContactList
