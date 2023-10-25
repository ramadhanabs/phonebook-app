import "@/styles/globals.css"
import { GetServerSideProps } from "next"
import type { AppProps } from "next/app"
import isMobile from "@/helpers/isMobile"
import MobileAppLayout from "@/components/layouts/MobileAppLayout"
import client from "@/graphql/urql"
import { Provider } from "urql"
import { Toaster } from "react-hot-toast"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ContainerMobile from "@/components/elements/ContainerMobile"

export default function App({ Component, pageProps }: AppProps) {
  const { isMobile } = pageProps

  if (isMobile)
    return (
      <Provider value={client}>
        <ContainerMobile>
          <MobileAppLayout>
            <Component {...pageProps} />
            <Toaster position="top-center"></Toaster>
          </MobileAppLayout>
        </ContainerMobile>
      </Provider>
    )
  return (
    <Provider value={client}>
      <Component {...pageProps} />
      <Toaster position="top-center"></Toaster>
    </Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
