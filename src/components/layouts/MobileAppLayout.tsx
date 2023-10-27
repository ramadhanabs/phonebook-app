/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import React, { PropsWithChildren } from "react"
import Header from "../elements/Header/Header"
import NavigationMobile from "../elements/Navigation/NavigationMobile"

const spacingStyle = css`
  margin-top: 54px;
  padding-bottom: 70px;
`

const MobileAppLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <>
      <Header isMobile />
      <div css={spacingStyle}>{children}</div>
      <NavigationMobile />
    </>
  )
}

export default MobileAppLayout
