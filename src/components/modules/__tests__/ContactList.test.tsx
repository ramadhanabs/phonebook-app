import { Provider } from "urql"
import { fromValue, pipe, delay } from "wonka"
import { contact } from "@/tests/mock/data"
import ContactList from "../ContactList/ContactList"
import { render, screen } from "@testing-library/react"

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

describe("Contact List", () => {
  it("If loading/fetching show component loader", () => {
    const responseState = {
      executeQuery: jest.fn(() => pipe(fromValue(contact), delay(100))),
    }

    render(
      <Provider value={responseState}>
        <ContactList type="home" />
      </Provider>
    )

    expect(screen.getByTestId("contact-list-loader")).toBeInTheDocument()
  })
  it("If contact list 0, show empty state", () => {
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            contact: [],
          },
        }),
    }

    render(
      <Provider value={responseState}>
        <ContactList type="home" />
      </Provider>
    )

    expect(screen.getByTestId("empty-state")).toBeInTheDocument()
  })
  it("If contact list > 0, show component container", () => {
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

    expect(screen.getByTestId("contact-card-wrapper")).toBeInTheDocument()
  })
  it("If contact list === n, show n card contact", () => {
    const contacts = [
      {
        ...contact,
      },
      {
        ...contact,
      },
    ]
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            contact: contacts,
          },
        }),
    }

    render(
      <Provider value={responseState}>
        <ContactList type="home" />
      </Provider>
    )

    expect(screen.getAllByTestId("card-container")).toHaveLength(2)
  })
})
