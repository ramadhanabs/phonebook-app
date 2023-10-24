/** @jsxRuntime classic */
/** @jsx jsx */

import BottomSheetModal from "@/components/elements/BottomSheetModal/BottomSheetModal"
import FormInputText from "@/components/elements/Forms/FormInputText"
import { jsx, css } from "@emotion/react"
import React, { useState } from "react"
import useDisclosure from "@/hooks/useDisclosure"
import { useForm } from "react-hook-form"
import ModalCreateContact from "./ModalCreateContact"

const baseHeroStyle = css`
  background: url("/bg-summary.webp");
  background-size: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const baseCardStyle = css`
  background: white;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 2.5px 2.8px 2.2px rgba(0, 0, 0, 0.017), 6px 6.7px 5.3px rgba(0, 0, 0, 0.024);

  display: flex;
  flex-direction: column;
  gap: 4px;

  .title {
    font-weight: 600;
  }

  .subtitle {
    color: #6d7588;
    font-size: 12px;
  }

  button {
    background: #04a95b;
    padding: 8px 12px;
    color: white;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 16px;

    display: flex;
    justify-content: center;
  }
`

const HeroSection = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <div css={baseHeroStyle}>
        <div css={baseCardStyle}>
          <p className="title">Seamless Entry</p>
          <p className="subtitle">
            Begin by clicking the button below to create new contact. <br></br>
            To edit or remove, interact with the card items displayed.
          </p>
          <button onClick={onOpen}>Add New Contact</button>
        </div>
      </div>

      <ModalCreateContact isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default HeroSection
