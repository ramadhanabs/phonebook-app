/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"

const baseContentLoaderStyle = css`
  background: #c4c2c2;
  border-radius: 8px;

  .animate-pulse {
    height: 100%;
    animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: #e8e8e8;
    border-radius: 8px;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }
`

interface ContentLoaderProps {
  width?: string | number
  height?: string | number
  isRounded?: boolean
  className?: string
  isClassNameDimension?: boolean
}

export default function ContentLoader(props: ContentLoaderProps) {
  const { width = "100%", height = "100%" } = props

  const dimension = { width, height }

  return (
    <div css={baseContentLoaderStyle} style={dimension}>
      <div className="animate-pulse"></div>
    </div>
  )
}
