/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import MetaData from "@/components/MetaData"
import HeroSection from "@/composites/contact-form/HeroSection"
import ContactList from "@/components/modules/ContactList/ContactList"
import isMobile from "@/helpers/isMobile"
import { GetServerSideProps } from "next"
import React from "react"
import { useQuery } from "@apollo/client"
import { ContactResponse } from "@/types"
import { GET_CONTACT_LIST } from "@/graphql/queries"
import { variables } from "."

const recentContactWrapperStyle = css`
  padding-top: 20px;

  h1 {
    padding-left: 20px;
    padding-right: 20px;

    font-size: 18px;
  }
`

const ContactFormPage = () => {
  const { loading, error, data } = useQuery<ContactResponse>(GET_CONTACT_LIST, { variables })
  const contactData = data?.contact

  return (
    <>
      <MetaData title="Contact Form" />
      <main>
        <HeroSection />

        <div css={recentContactWrapperStyle}>
          <h1>Recent Contact</h1>
          <ContactList isLoading={loading} data={contactData} />
        </div>
      </main>
    </>
  )
}

export default ContactFormPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
