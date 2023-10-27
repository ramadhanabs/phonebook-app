/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ContactList from "../modules/ContactList/ContactList"
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"

const baseSidebarStyle = css`
  width: 360px;
  background: #fafafa;
  height: calc(100vh - 54px);
  border-left: 1px solid #d6dfeb;
  overflow-y: scroll;
  position: relative;

  .section-title {
    padding: 16px 16px 0px 16px;
    font-weight: 600;
  }
`

const Sidebar = () => (
  <div css={baseSidebarStyle}>
    <p className="section-title">Recent Contact</p>
    <ContactList isWithPagination type="home"></ContactList>
  </div>
)

export default Sidebar
