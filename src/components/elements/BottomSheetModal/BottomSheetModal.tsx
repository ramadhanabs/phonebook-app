/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import React, { PropsWithChildren } from "react"
import Sheet, { SheetRef } from "react-modal-sheet"

const baseOverlayStyle = css`
  position: fixed;
  z-index: 100;
  top: 0px;

  background: black;
  opacity: 50%;
  height: 100vh;
  width: 100vw;
`
const baseHeaderStyle = css`
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
`

interface BottomSheetModalProps {
  isOpen: boolean
  onClose: () => void
  closeOnOverlayClick?: false
  title: string
  "data-testid"?: string
}

const BottomSheetModal = (props: PropsWithChildren<BottomSheetModalProps>) => {
  const { isOpen, onClose, children, title } = props
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        tweenConfig={{ ease: "easeIn", duration: 0.1 }}
        snapPoints={[640, 0]}
        detent="content-height"
        data-testid={props["data-testid"]}
      >
        <Sheet.Container>
          <Sheet.Header css={baseHeaderStyle}>{title}</Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller draggableAt="both">{children}</Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </>
  )
}

export default BottomSheetModal
