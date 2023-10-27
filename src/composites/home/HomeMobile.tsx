import ContactList from "@/components/modules/ContactList/ContactList"
import React from "react"
import ContactSummary from "./ContactSummary"
import HeroSlider from "./HeroSlider"

const HomeMobile = () => {
  return (
    <>
      <main>
        <ContactSummary isMobile />
        <HeroSlider isMobile />
        <ContactList isWithPagination type="home" />
      </main>
    </>
  )
}

export default HomeMobile
