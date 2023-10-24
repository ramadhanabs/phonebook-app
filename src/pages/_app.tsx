import "@/styles/globals.css"
import { GetServerSideProps } from "next"
import type { AppProps } from "next/app"
import isMobile from "@/helpers/isMobile"
import MobileAppLayout from "@/components/layouts/MobileAppLayout"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default function App({ Component, pageProps }: AppProps) {
  const { isMobile } = pageProps

  if (isMobile)
    return (
      <MobileAppLayout>
        <Component {...pageProps} />
      </MobileAppLayout>
    )
  return <Component {...pageProps} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req),
    },
  }
}
