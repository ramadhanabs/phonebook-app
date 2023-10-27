/** @jsxRuntime classic */
/** @jsx jsx */

import PrimaryButton from "@/components/elements/Button/PrimaryButton"
import ContactCard, { ContactCardLoader } from "@/components/modules/ContactCard/ContactCard"
import { GET_CONTACT_LIST } from "@/graphql/queries"
import useDisclosure from "@/hooks/useDisclosure"
import { ContactResponse, IContact } from "@/types"
import { useQuery } from "urql"
import { jsx, css } from "@emotion/react"
import React, { useEffect, useMemo, useState } from "react"
import ModalContactDetail from "./ModalContactDetail"
import useDBContacts from "@/hooks/useDBContacts"
import Link from "next/link"

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

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 20px 0px;
    border: 1px solid #e4ebf5;
    border-radius: 8px;
    gap: 4px;

    p.title {
      font-size: 14px;
      font-weight: 600;
    }

    p.subtitle {
      font-size: 12px;
      opacity: 50%;
      margin-bottom: 16px;
    }
  }
`

export type ContactListType = "home" | "favorite"

interface ContactListProps {
  isWithPagination?: boolean
  type?: ContactListType
}

const LIMIT = 10

const ContactListLoader = () => {
  return (
    <div css={baseContactListStyle} data-testid="contact-list-loader">
      {Array.from(Array(5).keys()).map((_, idx) => (
        <ContactCardLoader key={idx} />
      ))}
    </div>
  )
}

const ContactList = (props: ContactListProps) => {
  const { isWithPagination, type } = props
  const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure()

  const [offset, setOffset] = useState(0)
  const [result, reexecuteQuery] = useQuery<ContactResponse>({
    query: GET_CONTACT_LIST,
    variables: {
      limit: LIMIT,
      offset,
      order_by: {
        created_at: "desc",
      },
    },
  })
  const { data, fetching } = result
  const contactData = useMemo(() => {
    return data?.contact ?? []
  }, [data])

  const { data: dataFavorite, refetch: refetchFavorite } = useDBContacts({ enabled: true })
  const listIdFavorite = useMemo(() => dataFavorite.map(item => item.contact_id), [dataFavorite])

  const [mergedData, setMergedData] = useState<IContact[]>([])
  const [selectedContact, setSelectedContact] = useState<IContact | undefined>(undefined)

  /* Remove contact that already in local storage from list */
  const filteredContactList = useMemo(() => {
    if (!type) return contactData
    if (type === "favorite") return dataFavorite

    // return mergedData.filter(item => !listIdFavorite.includes(item.id))
    return contactData
  }, [mergedData, contactData, type, dataFavorite, listIdFavorite])

  const handleOpenModal = (contact: IContact) => {
    setSelectedContact(contact)
    onOpenDetail()
  }

  const handleLoadMore = () => {
    setOffset(offset + LIMIT)
    window.scrollTo(0, document.body.scrollHeight)
  }

  const refetch = () => {
    setMergedData([])
    reexecuteQuery({ requestPolicy: "network-only" })
    refetchFavorite()
  }

  useEffect(() => {
    if (contactData) {
      setMergedData([...mergedData, ...contactData])
    }
  }, [contactData])

  if (fetching && mergedData.length < 1) return <ContactListLoader />

  if (filteredContactList.length === 0) {
    return (
      <div css={baseContactListStyle} data-testid="empty-state">
        <div className="empty-state">
          <p className="title">Hmm, no contact found 🤔</p>
          <p className="subtitle">Wanna create one?</p>
          <Link href="/contact-form">
            <PrimaryButton type="button">Create Contact</PrimaryButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div css={baseContactListStyle} data-testid="contact-card-wrapper">
        {filteredContactList?.map((item, idx) => (
          <ContactCard
            data={item as IContact}
            key={idx}
            type={type}
            onOpenModal={() => handleOpenModal(item as IContact)}
            data-testid="card-container"
          />
        ))}

        {isWithPagination && (
          <PrimaryButton type="button" isLoading={fetching} onClick={handleLoadMore}>
            Load More
          </PrimaryButton>
        )}
      </div>

      <ModalContactDetail
        selectedContact={selectedContact}
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        type={type}
        refetch={refetch}
      />
    </>
  )
}

export default ContactList
