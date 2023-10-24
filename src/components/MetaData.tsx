import Head from "next/head"
import React from "react"

interface MetaDataProps {
  title: string
}

const MetaData = (props: MetaDataProps) => {
  return (
    <Head>
      <title>{props.title} | Phonebook App | Tokopedia Recruitment Test</title>
      <meta
        name="description"
        content="Phonebook is a mini project for Tokopedia Recruitment Test. Built by Ramadhana Bagus Solichuddin."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MetaData
