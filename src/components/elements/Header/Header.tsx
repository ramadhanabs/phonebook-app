/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import Image from "next/image"
import React, { useState, KeyboardEvent } from "react"
import FormInputText from "../Forms/FormInputText"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "urql"
import { ContactResponse } from "@/types"
import { GET_CONTACT_LIST } from "@/graphql/queries"
import ContactCard from "@/components/modules/ContactCard/ContactCard"

const baseNavStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 20;
  box-shadow: rgba(109, 117, 136, 0.16) 0px -2px 4px 0px;
  height: 54px;
  border-top: 1px solid #d6dfeb;
  border-bottom: 1px solid #d6dfeb;

  background: white;

  .wrapper {
    position: relative;
  }

  .navbar-content-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    z-index: 9999;
  }

  .search-menu-container {
    position: absolute;
    top: 52px;
    z-index: 10;

    background: white;
    border-top: 1px solid #d6dfeb;
    border-bottom: 1px solid #d6dfeb;
    height: 70vh;
    width: 100%;
    padding: 8px;

    overflow-y: scroll;
    transform-origin: top center;
  }

  .overlay {
    background: black;
    height: 100vh;
    width: 100%;
    z-index: 9999;
    display: fixed;
  }

  .search-result-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;

    p.title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    p.subtitle {
      font-size: 12px;
      opacity: 50%;
    }
  }
`

const Header = () => {
  const [isShowSearch, setIsShowSearch] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [result, fetch] = useQuery<ContactResponse>({
    query: GET_CONTACT_LIST,
    pause: true,
    variables: {
      limit: 10,
      offset: 0,
      order_by: {
        created_at: "desc",
      },
      where: {
        first_name: { _like: `%${keyword}%` },
      },
    },
  })

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetch()
    }
  }

  const contentResultRenderer = () => {
    if (!result.data) {
      return (
        <div className="empty-state" data-testid="empty-state">
          <div>
            <p className="title">Search contact here 🔍</p>
            <p className="subtitle">Input by first name of contact</p>
          </div>
        </div>
      )
    }

    if (result.data.contact.length === 0) {
      return (
        <div className="empty-state">
          <div>
            <p className="title">Oops! We cant find your data 🥺</p>
            <p className="subtitle">Please try another keyword</p>
          </div>
        </div>
      )
    }

    return (
      <div className="search-result-wrapper">
        {result?.data?.contact.map(item => (
          <ContactCard key={item.id} data={item} />
        ))}
      </div>
    )
  }

  return (
    <header css={[baseNavStyle]}>
      <div className="wrapper">
        <div className="navbar-content-wrapper">
          <Image src="/logo.svg" width={120} height={30} alt="logo-phonebook" />
          <FormInputText
            aria-label="Search Field"
            placeholder={isShowSearch ? "Type 'Enter' to search " : "Search by First Name"}
            onFocus={() => setIsShowSearch(true)}
            onBlur={() => setIsShowSearch(false)}
            onKeyDown={handleKeyDown}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {isShowSearch && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="search-menu-container"
                data-testid="search-menu-container"
              >
                {contentResultRenderer()}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="overlay"
              ></motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
