/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import { PropsWithChildren } from "react"
import classNames from "classnames"

const baseContainerStyle = css`
  width: 100%;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`

export default function ContainerDesktop(
  props: PropsWithChildren<{
    className?: string
    onClick?: () => void
    onMouseOver?: () => void
    onMouseLeave?: () => void
  }>
) {
  const { children, className = "", onClick, onMouseOver, onMouseLeave } = props

  return (
    <div
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      css={baseContainerStyle}
    >
      {children}
    </div>
  )
}
