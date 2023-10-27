/** @jsxRuntime classic */
/** @jsx jsx */

import ContactList from "@/components/modules/ContactList/ContactList"
import { jsx, css } from "@emotion/react"
import React from "react"
import Image from "next/image"
import HeroSlider from "./HeroSlider"
import ContactSummary from "./ContactSummary"
import Sidebar from "@/components/layouts/Sidebar"

const baseHomeStyle = css`
  display: flex;
  width: 100%;
  align-items: center;

  .container-home {
    width: 100%;
    height: calc(100vh - 54px);
    background: #f7f7f7;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-content {
    width: 800px;
    background: white;
    border: 1px solid #d6dfeb;
    border-radius: 8px;
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const HomeDesktop = () => {
  return (
    <>
      <Image src="/logo.svg" width={120} height={30} alt="logo-phonebook" />
      <ContactSummary />
      <HeroSlider />
    </>
  )
}

export default HomeDesktop
