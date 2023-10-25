/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import React, { useEffect, useState } from "react"
import ContactCard from "../ContactCard/ContactCard"
import { ContactListType } from "./ContactList"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import ContactForm from "../ContactForm/ContactForm"
import { IContact } from "@/types"

const baseBottomSheetStyle = css`
  .wrapper-contact-detail {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .wrapper-contact-card {
      padding: 0px 16px;
    }

    hr {
      opacity: 30%;
    }

    .button-action-wrapper {
      padding: 0px 16px 16px 16px;

      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .delete-action-wrapper {
      padding: 16px;
      height: 200px;

      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;

      .title {
        font-weight: 600;
        font-size: 14px;
      }

      .button-confirmation-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;

        button {
          padding: 8px;
          font-size: 14px;
          background: #04a95b;
          color: white;
          border-radius: 8px;
          width: 60px;

          display: flex;
          justify-content: center;
        }
      }
    }

    button.action {
      background: white;
      outline: 1px solid #d6dfeb;
      outline-offset: -1px;
      border-radius: 8px;
      padding: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      .content-wrapper {
        display: flex;
        gap: 8px;

        .icon-wrapper-edit {
          background: #04a95b20;
          padding: 8px;
          border-radius: 8px;
          height: max-content;
        }

        .icon-wrapper-delete {
          background: #de262620;
          padding: 8px;
          border-radius: 8px;
          height: max-content;
        }

        .icon-edit {
          width: 20px;
          height: 20px;
          color: #04a95b;
        }

        .icon-delete {
          width: 20px;
          height: 20px;
          color: #de2626;
        }

        .title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .subtitle {
          color: #6d7588;
          font-size: 12px;

          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }

      .icon-chevron {
        width: 24px;
        height: 24px;
        color: #04a95b;
      }
    }
  }
`

interface ModalContactDetailProps {
  isOpen: boolean
  onClose: () => void
  type?: ContactListType
  selectedContact?: IContact
}

const ModalContactDetail = (props: ModalContactDetailProps) => {
  const { isOpen, onClose, selectedContact } = props
  const [detailMode, setDetailMode] = useState<string>("")

  useEffect(() => {
    if (!isOpen) {
      setDetailMode("")
    }
  }, [isOpen])

  const contactButtonRenderer = () => (
    <div className="button-action-wrapper">
      <button className="action" onClick={() => setDetailMode("edit")}>
        <div className="content-wrapper">
          <div className="icon-wrapper-edit">
            <PencilSquareIcon className="icon-edit" />
          </div>

          <div>
            <p className="title">Edit Contact</p>
            <p className="subtitle">Edit your existing data by clicking this button.</p>
          </div>
        </div>
        <ChevronRightIcon className="icon-chevron" />
      </button>

      <button className="action" onClick={() => setDetailMode("delete")}>
        <div className="content-wrapper">
          <div className="icon-wrapper-delete">
            <TrashIcon className="icon-delete" />
          </div>

          <div>
            <p className="title">Delete Contact</p>
            <p className="subtitle">Remove this entry by clicking this button.</p>
          </div>
        </div>
        <ChevronRightIcon className="icon-chevron" />
      </button>
    </div>
  )

  const deleteConfirmationRenderer = () => {
    return (
      <div className="delete-action-wrapper">
        <p className="title">Are you sure to delete this contact?</p>

        <div className="button-confirmation-wrapper">
          <button>Yes</button>
          <button onClick={() => setDetailMode("")}>No</button>
        </div>
      </div>
    )
  }

  const contentRenderer = () => {
    switch (detailMode) {
      case "edit":
        return <ContactForm isEditForm />
      case "delete":
        return deleteConfirmationRenderer()
      default:
        return contactButtonRenderer()
    }
  }

  return (
    <BottomSheetModal title="Detail Contact" isOpen={isOpen} onClose={onClose}>
      <div css={baseBottomSheetStyle}>
        <div className="wrapper-contact-detail">
          <div className="wrapper-contact-card">
            <ContactCard data={selectedContact} />
          </div>

          <hr />

          {contentRenderer()}
        </div>
      </div>
    </BottomSheetModal>
  )
}

export default ModalContactDetail
