import { PropsWithChildren } from "react"
import { css } from "@emotion/react"
import classNames from "classnames"

const baseContainerStyle = css`
  width: 100%;
  max-width: 600px;
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
      className={classNames({ baseContainerStyle, className })}
    >
      {children}
    </div>
  )
}
