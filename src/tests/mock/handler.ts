import { graphql } from "msw"
import { contact } from "./data"

export const ContactQueries = [
  graphql.query("GetContactList", (req, res, ctx) => {
    return res(ctx.data([{ ...contact }]))
  }),
]

const handler = [...ContactQueries]
export { handler }
