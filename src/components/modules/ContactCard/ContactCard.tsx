/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useMemo } from "react"
import { ContactListType } from "@/components/modules/ContactList/ContactList"
import { jsx, css } from "@emotion/react"
import { IContact, Phone } from "@/types"
import ContentLoader from "@/components/elements/ContentLoader"
import { IContactDB } from "@/db/config"
import fakeImage from "@/helpers/fakeImage"

const contactCardStyle = css`
  background: white;
  border: 1px solid #d6dfeb;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  img {
    border-radius: 9999px;
  }

  .container {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 12px 12px 12px 16px;

    position: relative;
    width: 100%;
  }

  .accent {
    position: absolute;
    left: 0px;
    width: 5px;
    border-radius: 0px 4px 4px 0px;
    height: 60%;
    background: #00aa5b;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .content {
    font-size: 14px;
    color: #6d7588;
  }
  .content-detail {
    color: #04a95b;
    font-size: 10px;
    border-radius: 9999px;
    font-weight: 600;
  }

  .button-wrapper {
    background: #00aa5b;
    width: 60px;
    height: 62px;
    border-radius: 0px 8px 8px 0px;

    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    color: white;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .loader-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`

interface ContactCardProps {
  type?: ContactListType
  onOpenModal?: () => void
  data?: IContact
  "data-testid"?: string
}

export const ContactCardLoader = () => (
  <div css={contactCardStyle}>
    <div className="container">
      <div className="accent"></div>
      <ContentLoader width="32px" height="32px" />

      <div className="loader-content-wrapper">
        <ContentLoader width="200px" height="8px" />
        <ContentLoader width="160px" height="8px" />
      </div>
    </div>
  </div>
)

const ContactCard = (props: ContactCardProps) => {
  const phoneList: Phone[] = useMemo(() => {
    const contact = props.data as unknown as IContactDB
    if (props.type === "favorite" && contact.contact_id && contact.phones) {
      return JSON.parse(contact.phones)
    }

    return props.data?.phones
  }, [props.data])

  if (!props.data) return <></>
  return (
    <div css={contactCardStyle}>
      <div
        className="container"
        onClick={props.onOpenModal}
        data-testid={props["data-testid"]}
        style={{ cursor: props.onOpenModal ? "pointer" : "default" }}
      >
        <div className="accent"></div>
        <img src={fakeImage("thumbs")} width="32px" height="32px" alt="logo-phonebook-white" />
        <div>
          <p className="title">
            {props.data.first_name} {props.data.last_name}
          </p>
          {phoneList.length > 0 && (
            <div className="content-wrapper">
              <p className="content">{phoneList[0]?.number}</p>
              {phoneList.length > 1 && (
                <div className="content-detail">+{phoneList.length - 1} More</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactCard
