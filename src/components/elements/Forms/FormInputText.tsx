/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react"

const formBaseStyle = css`
  width: 100%;
  border: 1px solid #e4ebf5;
  border-radius: 8px;
  padding: 8px 12px;
  height: max-content;
  color: #4a4d52;

  &:focus {
    outline: #04a95b;
    border: 1px solid #04a95b;
  }

  &::placeholder {
    color: #939bad;
  }
`

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const FormInputText = (props: TextInputProps, ref: LegacyRef<HTMLInputElement>) => {
  const { className, ...options } = props
  return <input ref={ref} css={[formBaseStyle]} {...options} />
}

export default forwardRef(FormInputText)
