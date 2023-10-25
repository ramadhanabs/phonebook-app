/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import MetaData from "@/components/MetaData"
import ContactList from "@/components/modules/ContactList/ContactList"
import isMobile from "@/helpers/isMobile"
import { GetServerSideProps } from "next"
import React from "react"

const recentFavoriteStyle = css`
  padding-top: 20px;

  h1 {
    padding-left: 20px;
    padding-right: 20px;

    font-size: 18px;
  }
`

const FavoritePage = () => {
  return (
    <>
      <MetaData title="Favorite" />

      <div css={recentFavoriteStyle}>
        <h1>Recent Favorite</h1>
        <ContactList count={5} type="favorite" />
      </div>
    </>
  )
}

export default FavoritePage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
