import "@/styles/globals.css"
import { GetServerSideProps } from "next"
import type { AppProps } from "next/app"
import isMobile from "@/helpers/isMobile"
import MobileAppLayout from "@/components/layouts/MobileAppLayout"
import client from "@/graphql/apollo"
import { ApolloProvider } from "@apollo/client"
import { Toaster } from "react-hot-toast"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default function App({ Component, pageProps }: AppProps) {
  const { isMobile } = pageProps

  if (isMobile)
    return (
      <ApolloProvider client={client}>
        <MobileAppLayout>
          <Component {...pageProps} />
          <Toaster position="top-center"></Toaster>
        </MobileAppLayout>
      </ApolloProvider>
    )
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <Toaster position="top-center"></Toaster>
    </ApolloProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
