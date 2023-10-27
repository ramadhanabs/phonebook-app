import { render, waitFor, screen } from "@testing-library/react"
import HeroSlider from "../HeroSlider"
import { contact } from "@/tests/mock/data"
import useDBContacts from "@/hooks/useDBContacts"

jest.mock("@/hooks/useDBContacts")

describe("Favorite Contact Slider", () => {
  it("If data favorite length > 0, component should be rendered", async () => {
    jest.mocked(useDBContacts).mockImplementation(() => ({
      data: [
        {
          id: 1,
          first_name: "test",
          last_name: "testt",
          phones: "",
          contact_id: 123,
        },
      ],
      deleteContact: jest.fn(),
      storeContact: jest.fn(),
      refetch: jest.fn(),
      isLoading: false,
    }))

    render(<HeroSlider />)

    await waitFor(() => {
      expect(screen.getByTestId("favorite-contact-container")).toBeInTheDocument()
    })
  })
  it("If data favorite length === 0, component should be hidden", async () => {
    jest.mocked(useDBContacts).mockImplementation(() => ({
      data: [],
      deleteContact: jest.fn(),
      storeContact: jest.fn(),
      refetch: jest.fn(),
      isLoading: false,
    }))

    render(<HeroSlider />)

    await waitFor(() => {
      expect(screen.queryByTestId("favorite-contact-container")).not.toBeInTheDocument()
    })
  })

  it("If data is fetching, should render loader", async () => {
    jest.mocked(useDBContacts).mockImplementation(() => ({
      data: [
        {
          id: 1,
          first_name: "test",
          last_name: "testt",
          phones: "",
          contact_id: 123,
        },
      ],
      deleteContact: jest.fn(),
      storeContact: jest.fn(),
      refetch: jest.fn(),
      isLoading: true,
    }))

    render(<HeroSlider />)

    await waitFor(() => {
      const loader = screen.getAllByTestId("loader")
      expect(loader).toHaveLength(5)
    })
  })
})
