import { render, screen } from "@testing-library/react"
import PrimaryButton from "../PrimaryButton"

describe("Button Component", () => {
  it("Show loading state when props loading true", () => {
    render(<PrimaryButton type="button" isLoading />)

    screen.debug()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("Render button with children field ", () => {
    render(<PrimaryButton type="button">Test</PrimaryButton>)

    screen.debug()
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})
