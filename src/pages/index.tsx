import React, { useEffect } from "react"
import isMobile from "@/helpers/isMobile"
import { GetServerSideProps } from "next"
import HeroSlider from "@/composites/home/HeroSlider"
import ContactSummary from "@/composites/home/ContactSummary"
import ContactList from "@/components/modules/ContactList/ContactList"
import MetaData from "@/components/MetaData"
import HomeMobile from "@/composites/home/HomeMobile"
import HomeDesktop from "@/composites/home/HomeDesktop"

export default function Home(props: { isMobile: boolean }) {
  const { isMobile } = props

  const contentRenderer = () => {
    if (isMobile) return <HomeMobile />

    return <HomeDesktop />
  }

  return (
    <>
      <MetaData title="Home" />
      {contentRenderer()}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
