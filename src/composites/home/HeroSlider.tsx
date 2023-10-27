/** @jsxRuntime classic */
/** @jsx jsx */

import React from "react"
import { jsx, css } from "@emotion/react"
import useDBContacts from "@/hooks/useDBContacts"
import Link from "next/link"
import ContentLoader from "@/components/elements/ContentLoader"
import fakeImage from "@/helpers/fakeImage"

const heroStyle = css`
  background: url("/bg-homepage.webp");
  background-size: 100%;
  object-fit: cover;
  height: 100%;
  background-repeat: no-repeat;
  width: 100%;
  padding: 16px;

  h1 {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }

  .title-empty {
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
  }

  .subtitle-empty {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    color: white;
    opacity: 70%;
  }
`

const favoriteCardStyle = css`
  background: white;
  border-radius: 12px;
  min-width: 160px;

  img {
    height: 100px;
    width: 100%;
    border-radius: 12px 12px 0px 0px;
    object-fit: cover;
  }

  .title {
    font-size: 14px;
    font-weight: 700;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .subtitle {
    font-size: 14px;
    color: #6d7588;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .content {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

const lastFavoriteCardStyle = css`
  background: white;
  border-radius: 12px;
  min-width: 160px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  .title {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }

  button {
    background: #04a95b;
    padding: 4px 12px;
    color: white;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
  }
`

const sliderWrapperStyle = css`
  display: flex;
  gap: 8px;
  overflow: scroll;
  width: 100%;
  margin-top: 20px;
  flex-shrink: unset;
`

const Loader = () => {
  return (
    <div css={heroStyle}>
      <div className="no-scrollbar" css={sliderWrapperStyle}>
        {Array.from(Array(5).keys()).map((_, idx) => (
          <div css={favoriteCardStyle} key={idx} data-testid="loader">
            <ContentLoader width="100%" height="120px" />
            <div className="content">
              <ContentLoader height="8px" width="60px" />
              <ContentLoader height="8px" width="40px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const HeroSlider = ({ isMobile }: { isMobile?: boolean }) => {
  const { data, isLoading } = useDBContacts({ enabled: true })

  const cardRenderer = () => {
    return (
      <>
        {data.map((item, idx) => (
          <div css={favoriteCardStyle} key={idx}>
            <div style={{ padding: "20px", paddingBottom: 0 }}>
              <img src={fakeImage("notionists")} />
            </div>
            <div className="content">
              <p className="title">
                {item.first_name} {item.last_name}
              </p>
              <p className="subtitle">+6282227804252</p>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (isLoading) return <Loader />

  if (data.length === 0)
    return (
      <div css={heroStyle} style={{ borderRadius: !isMobile ? "8px" : "" }}>
        <p className="title-empty">Currently you having no interest to anyone</p>
        <p className="subtitle-empty">
          Tag them as favorite one by clicking contact card below/beside!
        </p>
      </div>
    )

  return (
    <div
      css={heroStyle}
      data-testid="favorite-contact-container"
      style={{ borderRadius: !isMobile ? "8px" : "" }}
    >
      <div className="no-scrollbar" css={sliderWrapperStyle}>
        <img src="/your-favorite-contact.png" width="120px" />
        {cardRenderer()}
        <div css={lastFavoriteCardStyle}>
          <p className="title">See other contacts?</p>
          <Link href="/favorite">
            <button>See All</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
