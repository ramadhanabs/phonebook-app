/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import React, { PropsWithChildren } from "react"
import ContainerDesktop from "../elements/ContainerDesktop"
import Header from "../elements/Header/Header"
import Sidebar from "./Sidebar"

const spacingStyle = css`
  margin-top: 54px;
`

const baseHomeStyle = css`
  display: flex;
  width: 100%;
  align-items: center;

  .container-home {
    width: 100%;
    height: calc(100vh - 54px);
    background: #f7f7f7;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-content {
    width: 800px;
    background: #fafafa;
    border: 1px solid #d6dfeb;
    border-radius: 8px;
    padding: 16px;
    max-height: 600px;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const DesktopAppLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <>
      <Header />
      <div css={spacingStyle}>
        <main css={baseHomeStyle}>
          <div className="container-home">
            <div className="card-content">{children}</div>
          </div>
          <Sidebar></Sidebar>
        </main>
      </div>
    </>
  )
}

export default DesktopAppLayout
