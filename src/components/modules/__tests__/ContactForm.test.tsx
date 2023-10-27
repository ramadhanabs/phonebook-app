import TestProvider from "@/tests/TestProvider"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ContactForm from "../ContactForm/ContactForm"
import { contact } from "@/tests/mock/data"
import userEvent from "@testing-library/user-event"

describe("Contact Form", () => {
  const user = userEvent.setup()
  beforeEach(() => {
    render(<ContactForm data={contact} onClose={() => {}} />, { wrapper: TestProvider })
  })
  it("Button should be disabled if all field empty", () => {
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled()
  })

  it("Button should be not disabled if one of field filled by character", async () => {
    const firstNameField = screen.getByRole("textbox", { name: "First Name" })
    await user.type(firstNameField, "try me")

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Save" })).not.toBeDisabled()
    })
  })

  it("It should show error message if firstname field included special character", async () => {
    const button = screen.getByRole("button", { name: "Save" })
    const firstNameField = screen.getByRole("textbox", { name: "First Name" })
    await user.type(firstNameField, "!!!!!")
    user.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("error-firstname")).toBeInTheDocument()
    })
  })

  it("It should show error message if lastname field included special character", async () => {
    const button = screen.getByRole("button", { name: "Save" })
    const lastNameField = screen.getByRole("textbox", { name: "Last Name" })
    await user.type(lastNameField, "!!!!!")
    user.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("error-lastname")).toBeInTheDocument()
    })
  })
})

describe("Contact Form Edit", () => {
  beforeEach(() => {
    render(<ContactForm isEditForm data={contact} onClose={() => {}} />, { wrapper: TestProvider })
  })

  it("Button label should show “Edit”", () => {
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })

  it("Button add number should not be rendered", () => {
    expect(screen.queryByTestId("button-add-phone")).not.toBeInTheDocument()
  })

  it("Field phone number should be disabled", () => {
    expect(screen.getByTestId("phones.1.number")).toBeDisabled()
  })
})

describe("Contact Form Create", () => {
  beforeEach(() => {
    render(<ContactForm onClose={() => {}} />, { wrapper: TestProvider })
  })
  it("Button label should show Save", () => {
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })
  it("Button add number should be rendered", () => {
    expect(screen.getByTestId("button-add-phone")).toBeInTheDocument()
  })
  it("Field phone number should not be disabled", () => {
    expect(screen.getByTestId("phones.0.number")).not.toBeDisabled()
  })
  it("When user click button add number 1x, it should add another field number", async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId("button-add-phone")
    user.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("phones.1.number")).toBeInTheDocument()
    })
  })
})
