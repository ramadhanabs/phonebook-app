/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import Image from "next/image"
import FormInputText from "../Forms/FormInputText"

const baseNavStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 20;
  box-shadow: rgba(109, 117, 136, 0.16) 0px -2px 4px 0px;
  height: 54px;
  border-top: 1px solid #d6dfeb;
  border-bottom: 1px solid #d6dfeb;

  background: white;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
`

const Header = () => {
  return (
    <header css={[baseNavStyle]}>
      <Image src="/logo.svg" width={120} height={30} alt="logo-phonebook" />
      <FormInputText placeholder="Search for Contact" />
    </header>
  )
}

export default Header
