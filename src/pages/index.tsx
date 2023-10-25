import React, { useEffect } from "react"
import isMobile from "@/helpers/isMobile"
import { GetServerSideProps } from "next"
import HeroSlider from "@/composites/home/HeroSlider"
import ContactSummary from "@/composites/home/ContactSummary"
import ContactList from "@/components/modules/ContactList/ContactList"
import MetaData from "@/components/MetaData"

export default function Home() {
  return (
    <>
      <MetaData title="Home" />
      <main>
        <ContactSummary />
        <HeroSlider />
        <ContactList isWithPagination type="home" />
      </main>
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
