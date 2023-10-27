/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import React, { useEffect, useState } from "react"
import ContactCard from "../ContactCard/ContactCard"
import { ContactListType } from "./ContactList"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, TrashIcon, HeartIcon } from "@heroicons/react/24/solid"
import ContactForm from "../ContactForm/ContactForm"
import { IContact } from "@/types"
import { useMutation } from "urql"
import { DELETE_CONTACT } from "@/graphql/mutations"
import toast from "react-hot-toast"
import PrimaryButton from "@/components/elements/Button/PrimaryButton"
import useDBContacts from "@/hooks/useDBContacts"
import { motion } from "framer-motion"

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
      border: 1px solid #d6dfeb;
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
  refetch: () => void
}

const ModalContactDetail = (props: ModalContactDetailProps) => {
  const { isOpen, onClose, selectedContact, refetch, type } = props
  const [detailMode, setDetailMode] = useState<string>("")

  const { storeContact, deleteContact } = useDBContacts({ enabled: false })

  const [deleteContactResult, deleteContactMutation] = useMutation(DELETE_CONTACT)
  const { fetching: loadingDelete } = deleteContactResult

  const handleFavorite = async () => {
    await storeContact(selectedContact)
    onClose()
    refetch()
    toast.success("Success add to favorite")
  }

  const handleRemoveFavorite = async () => {
    await deleteContact(selectedContact?.id ?? 0)
    onClose()
    refetch()
    toast.success("Success removing from favorite")
  }

  const onDelete = () => {
    deleteContactMutation({
      id: selectedContact?.id,
    })
      .then(result => {
        if (!result.error) {
          toast.success("Success delete contact")
          onClose()
          refetch()
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  useEffect(() => {
    if (!isOpen) {
      setDetailMode("")
    }
  }, [isOpen])

  const contactButtonRenderer = () => {
    if (type === "favorite") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="button-action-wrapper"
        >
          <button
            className="action"
            onClick={handleRemoveFavorite}
            data-testid="button-remove-favorite"
          >
            <div className="content-wrapper">
              <div className="icon-wrapper-delete">
                <TrashIcon className="icon-delete" />
              </div>

              <div>
                <p className="title">Remove from Favorite</p>
                <p className="subtitle">When someone no longer special to you</p>
              </div>
            </div>
            <ChevronRightIcon className="icon-chevron" />
          </button>
        </motion.div>
      )
    } else {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="button-action-wrapper"
        >
          <button className="action" onClick={handleFavorite} data-testid="button-favorite">
            <div className="content-wrapper">
              <div className="icon-wrapper-edit">
                <HeartIcon className="icon-edit" />
              </div>

              <div>
                <p className="title">Favorite</p>
                <p className="subtitle">Save this contact as your favorite one.</p>
              </div>
            </div>
            <ChevronRightIcon className="icon-chevron" />
          </button>

          <button
            className="action"
            onClick={() => setDetailMode("edit")}
            data-testid="button-edit"
          >
            <div className="content-wrapper">
              <div className="icon-wrapper-edit">
                <PencilSquareIcon className="icon-edit" />
              </div>

              <div>
                <p className="title">Edit Contact</p>
                <p className="subtitle">Wrong name? Just edit them here.</p>
              </div>
            </div>
            <ChevronRightIcon className="icon-chevron" />
          </button>

          <button
            className="action"
            onClick={() => setDetailMode("delete")}
            data-testid="button-delete"
          >
            <div className="content-wrapper">
              <div className="icon-wrapper-delete">
                <TrashIcon className="icon-delete" />
              </div>

              <div>
                <p className="title">Delete Contact</p>
                <p className="subtitle">Cut-off does not mean you hate them.</p>
              </div>
            </div>
            <ChevronRightIcon className="icon-chevron" />
          </button>
        </motion.div>
      )
    }
  }

  const deleteConfirmationRenderer = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="delete-action-wrapper"
        data-testid="confirmation-delete"
      >
        <p className="title">Are you sure to delete this contact?</p>

        <div className="button-confirmation-wrapper">
          <PrimaryButton type="button" isLoading={loadingDelete} onClick={onDelete}>
            Yes
          </PrimaryButton>
          <button onClick={() => setDetailMode("")}>No</button>
        </div>
      </motion.div>
    )
  }

  const contentRenderer = () => {
    switch (detailMode) {
      case "edit":
        return <ContactForm isEditForm data={selectedContact} onClose={onClose} refetch={refetch} />
      case "delete":
        return deleteConfirmationRenderer()
      default:
        return contactButtonRenderer()
    }
  }

  return (
    <BottomSheetModal
      title="Detail Contact"
      isOpen={isOpen}
      onClose={onClose}
      data-testid="modal-detail-contact"
    >
      <div css={baseBottomSheetStyle}>
        <div className="wrapper-contact-detail">
          <div className="wrapper-contact-card">
            <ContactCard data={selectedContact}/>
          </div>

          <hr />

          {contentRenderer()}
        </div>
      </div>
    </BottomSheetModal>
  )
}

export default ModalContactDetail
