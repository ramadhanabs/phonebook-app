import { render, screen } from "@testing-library/react"
import { Provider } from "urql"
import Header from "../Header"
import { fromValue } from "wonka"
import { contact } from "@/tests/mock/data"

describe("Search Component", () => {
  it("If search field not focused, should hide search container", () => {
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
        <Header />
      </Provider>
    )

    expect(screen.queryByTestId("search-menu-container")).not.toBeInTheDocument()
  })
  it("If search field focused, should show container", async () => {
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
        <Header />
      </Provider>
    )

    const searchField = screen.getByRole("textbox", { name: "Search Field" })
    await searchField.focus()

    expect(screen.getByTestId("search-menu-container")).toBeInTheDocument()
  })
  it("If there's no data, show empty state", async () => {
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
        <Header />
      </Provider>
    )

    const searchField = screen.getByRole("textbox", { name: "Search Field" })
    await searchField.focus()

    expect(screen.getByTestId("empty-state")).toBeInTheDocument()
  })
  it("If there's some data, show list of card", async () => {
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
        <Header />
      </Provider>
    )

    const searchField = screen.getByRole("textbox", { name: "Search Field" })
    await searchField.focus()

    screen.debug()
  })
})
