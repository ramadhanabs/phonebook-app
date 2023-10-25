import React, { useEffect } from "react"
import isMobile from "@/helpers/isMobile"
import { GetServerSideProps } from "next"
import HeroSlider from "@/composites/home/HeroSlider"
import ContactSummary from "@/composites/home/ContactSummary"
import ContactList from "@/components/modules/ContactList/ContactList"
import MetaData from "@/components/MetaData"
import { GET_CONTACT_LIST } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { ContactResponse, IContact } from "@/types"

export const variables = {
  limit: 10,
  offset: 1,
  order_by: {
    created_at: "desc",
  },
}

export default function Home() {
  const { loading, error, data } = useQuery<ContactResponse>(GET_CONTACT_LIST, { variables })
  const contactData = data?.contact

  return (
    <>
      <MetaData title="Home" />
      <main>
        <ContactSummary />
        <HeroSlider />
        <ContactList isLoading={loading} data={contactData} isWithPagination type="home" />
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
