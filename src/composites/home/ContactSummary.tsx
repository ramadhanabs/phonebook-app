/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import Link from "next/link"
import Image from "next/image"

const baseSummaryStyle = css`
  background: rgb(237, 242, 247);
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const baseCardStyle = css`
  background: url("/bg-summary.webp");
  background-color: #2a372f;
  background-size: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2.5px 2.8px 2.2px rgba(0, 0, 0, 0.017), 6px 6.7px 5.3px rgba(0, 0, 0, 0.024);

  display: flex;
  flex-direction: column;
  gap: 40px;

  .summary-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: white;
    font-size: 14px;
    text-align: center;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .content {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 4px;
  }

  .title {
    font-size: 12px;
  }

  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background: white;
    font-size: 12px;
    width: 70px;
    padding: 6px;
    border-radius: 9999px;
    font-weight: 600;
    text-align: center;
  }
`

const ContactSummary = () => {
  return (
    <div css={baseSummaryStyle}>
      <div css={baseCardStyle}>
        <div className="top-section">
          <Image src="/logo-white.svg" width={80} height={30} alt="logo-phonebook-white" />
          <Link href="/contact-form">
            <button>Add Contact</button>
          </Link>
        </div>
        <div className="summary-wrapper">
          <div>
            <p className="content">190</p>
            <p className="title">Total Contact</p>
          </div>
          <div>
            <p className="content">20</p>
            <p className="title">Favorite</p>
          </div>
          <div>
            <p className="content">20</p>
            <p className="title">New</p>
          </div>
          <div>
            <p className="content">9</p>
            <p className="title">Deleted</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSummary
