/** @jsxRuntime classic */
/** @jsx jsx */

import React from "react"
import { ContactListType } from "@/components/modules/ContactList/ContactList"
import { jsx, css } from "@emotion/react"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"

const contactCardStyle = css`
  background: white;
  outline: 1px solid #d6dfeb;
  outline-offset: -1px;
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
`

interface ContactCardProps {
  type?: ContactListType
  onOpenModal?: () => void
}

const ContactCard = (props: ContactCardProps) => {
  return (
    <div css={contactCardStyle}>
      <div className="container" onClick={props.onOpenModal}>
        <div className="accent"></div>
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Bubba"
          width="32px"
          height="32px"
          alt="logo-phonebook-white"
        />
        <div>
          <p className="title">Firstname Lastname</p>
          <div className="content-wrapper">
            <p className="content">081023123</p>
            <div className="content-detail">+2 More</div>
          </div>
        </div>
      </div>

      {props.type !== undefined ? (
        <button className="button-wrapper">
          {props.type === "home" ? (
            <>
              <HeartIcon className="icon" />
              <p style={{ fontSize: "10px" }}>Favorite</p>
            </>
          ) : (
            <>
              <HeartSolidIcon className="icon" />
              <p style={{ fontSize: "10px" }}>Remove</p>
            </>
          )}
        </button>
      ) : null}
    </div>
  )
}

export default ContactCard
