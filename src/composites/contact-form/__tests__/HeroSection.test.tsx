import { render, waitFor, screen, fireEvent } from "@testing-library/react"
import HeroSection from "../HeroSection"

jest.mock("@/components/modules/ContactForm/ContactForm")

describe("Modal Create Contact", () => {
  it("If user click button create contact, modal contact form should be render", () => {
    render(<HeroSection />)

    const button = screen.getByRole("button", { name: "Add New Contact" })
    fireEvent.click(button)

    expect(screen.getByTestId("modal-create-contact")).toBeInTheDocument
  })
})
