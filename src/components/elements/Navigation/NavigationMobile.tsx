/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react"
import { BookOpenIcon, BookmarkIcon, RectangleStackIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/router"

const baseNavStyle = css`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 20;
  box-shadow: rgba(109, 117, 136, 0.16) 0px -2px 4px 0px;
  height: 54px;

  background: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const iconBaseStyle = css`
  width: 24px;
  height: 24px;
`

const anchorBaseStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  font-size: 10px;
  color: #6d7588;
`

const anchorActiveStyle = css`
  color: #04a95b;
  border-top: 1px solid #04a95b;
`

const LIST_MENU = [
  {
    id: "contact",
    label: "Contact",
    href: "/",
    icon: <BookOpenIcon css={[iconBaseStyle]} />,
  },
  {
    id: "contact-form",
    label: "Contact Form",
    href: "/contact-form",
    icon: <RectangleStackIcon css={[iconBaseStyle]} />,
  },
  {
    id: "Favorite",
    label: "Favorite",
    href: "/contact-favorite",
    icon: <BookmarkIcon css={[iconBaseStyle]} />,
  },
]

const NavigationMobile = () => {
  const router = useRouter()

  return (
    <nav css={[baseNavStyle]}>
      {LIST_MENU.map(item => (
        <Link
          href={item.href}
          css={[anchorBaseStyle, item.href === router.pathname && anchorActiveStyle]}
          key={item.id}
        >
          {item.icon}
          <p>{item.label}</p>
        </Link>
      ))}
    </nav>
  )
}

export default NavigationMobile
