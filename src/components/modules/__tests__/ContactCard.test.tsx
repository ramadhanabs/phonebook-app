import { contact } from "@/tests/mock/data"
import ContactCard from "../ContactCard/ContactCard"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactList from "../ContactList/ContactList"
import { Provider } from "urql"
import { fromValue } from "wonka"

const mockStoreContact = jest.fn()
const mockDeleteContact = jest.fn()
const mockRefetch = jest.fn()

jest.mock("@/hooks/useDBContacts", () => {
  return () => ({
    data: [
      {
        id: 1,
        contact_id: 1,
        first_name: "test",
        last_name: "test lastname",
        phones: "",
      },
    ],
    storeContact: mockStoreContact,
    deleteContact: mockDeleteContact,
    refetch: mockRefetch,
  })
})

describe("Contact Card", () => {
  beforeEach(() => {
    render(<ContactCard data={contact} />)
  })
  it("If props data available, it should be rendered with shows name and phone number", () => {
    expect(screen.getByText(`${contact.first_name} ${contact.last_name}`)).toBeInTheDocument()
    expect(screen.getByText(`${contact.phones[0].number}`)).toBeInTheDocument()
  })
  it("If phone number > 1, it shows badge +n more", () => {
    expect(screen.getByText(`+${contact.phones.length - 1} More`)).toBeInTheDocument()
  })
})

describe("Integration Contact Card from Home Page", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            contact: [
              {
                ...contact,
              },
            ],
          },
        }),
    }

    render(
      <Provider value={responseState}>
        <ContactList type="home" />
      </Provider>
    )
  })

  it("If contact card clicked, it should show modal contact detail", async () => {
    await waitFor(() => {
      const container = screen.getByTestId("card-container")
      user.click(container)

      expect(screen.getByTestId("modal-detail-contact")).toBeInTheDocument()
    })
  })
  it("If contact card clicked from type “home” it should render button favorite, edit, and delete", async () => {
    await waitFor(() => {
      const container = screen.getByTestId("card-container")
      user.click(container)

      expect(screen.getByTestId("button-favorite")).toBeInTheDocument()
      expect(screen.getByTestId("button-edit")).toBeInTheDocument()
      expect(screen.getByTestId("button-delete")).toBeInTheDocument()
    })
  })
  it("If user click favorite, it should hit function storeDB", async () => {
    const container = screen.getByTestId("card-container")
    await user.click(container)

    const button = screen.getByTestId("button-favorite")
    await user.click(button)

    expect(mockStoreContact).toHaveBeenCalled()
  })
  it("If user click edit, it should show contact form edit", async () => {
    const container = screen.getByTestId("card-container")
    await user.click(container)

    const button = screen.getByTestId("button-edit")
    await user.click(button)

    expect(screen.getByTestId("contact-form")).toBeInTheDocument()
  })
  it("If user click delete, it should show confirmation box", async () => {
    const container = screen.getByTestId("card-container")
    await user.click(container)

    const button = screen.getByTestId("button-delete")
    await user.click(button)

    expect(screen.getByTestId("confirmation-delete")).toBeInTheDocument()
  })
})

describe("Integration Contact Card from Favorite Page", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            contact: [
              {
                ...contact,
              },
            ],
          },
        }),
    }

    render(
      <Provider value={responseState}>
        <ContactList type="favorite" />
      </Provider>
    )
  })

  it("If contact card clicked from type “favorite” it should render button remove from favorite", async () => {
    await waitFor(() => {
      const container = screen.getByTestId("card-container")
      user.click(container)

      expect(screen.getByTestId("button-remove-favorite")).toBeInTheDocument()
    })
  })

  it("If user click button remove favorite, function delete should be called", async () => {
    const container = screen.getByTestId("card-container")
    await user.click(container)

    const button = screen.getByTestId("button-remove-favorite")
    await user.click(button)

    expect(mockDeleteContact).toHaveBeenCalled()
  })
})
