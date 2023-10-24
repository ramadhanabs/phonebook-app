/** @jsxRuntime classic */
/** @jsx jsx */

import React from "react"
import { jsx, css } from "@emotion/react"

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

const HeroSlider = () => {
  return (
    <div css={heroStyle}>
      <div className="no-scrollbar" css={sliderWrapperStyle}>
        <img src="/your-favorite-contact.png" width="120px" />
        {Array.from(Array(4).keys()).map((_, idx) => (
          <div css={favoriteCardStyle} key={idx}>
            <div style={{ padding: "20px", paddingBottom: 0 }}>
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sophie" />
            </div>
            <div className="content">
              <p className="title">Ramadhana Bagus</p>
              <p className="subtitle">+6282227804252</p>
            </div>
          </div>
        ))}
        <div css={lastFavoriteCardStyle}>
          <p className="title">Wanna see other contacts?</p>
          <button>See All</button>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
