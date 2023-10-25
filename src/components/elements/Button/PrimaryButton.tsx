/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react"

const baseButtonStyle = css`
  background: #04a95b;
  padding: 8px;
  color: white;
  outline: none;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  width: 100%;

  box-sizing: border-box;

  &:disabled {
    opacity: 50%;
  }
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  isLoading?: boolean
}

const PrimaryButton = (props: PropsWithChildren<ButtonProps>) => {
  const { isLoading, children, type, ...options } = props

  return (
    <button css={baseButtonStyle} type={type} {...options}>
      {isLoading ? <p>Loading...</p> : children}
    </button>
  )
}

export default PrimaryButton
