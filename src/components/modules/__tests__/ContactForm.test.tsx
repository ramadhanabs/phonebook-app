import TestProvider from "@/tests/TestProvider"

describe("Contact Form", () => {
  it("Button should be disabled if all field empty", () => {})
  it("Button should be not disabled if one of field filled by character", () => {})
  it("It should show error message if firstname field included special character", () => {})
  it("It should show error message if lastname field included special character", () => {})
})

describe("Contact Form Create", () => {
  it("Button label should show “Edit”", () => {})
  it("Button add number should not be rendered", () => {})
  it("Field phone number should be disabled", () => {})
})

describe("Contact Form Edit", () => {
  it("Button label should show Save", () => {})
  it("Button add number should be rendered", () => {})
  it("Field phone number should not be disabled", () => {})
  it("When user click button add number 1x, it should add another field number", () => {})
})
