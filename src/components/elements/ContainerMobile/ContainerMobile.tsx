/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import { PropsWithChildren } from "react"

const baseContainerStyle = css`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

export default function ContainerMobile(props: PropsWithChildren<{ className?: string }>) {
  const { children } = props
  return <div css={[baseContainerStyle]}>{children}</div>
}
