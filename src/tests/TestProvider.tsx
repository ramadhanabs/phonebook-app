import { PropsWithChildren } from "react"
import { Provider } from "urql"
import client from "@/graphql/urql"

export default function TestProvider({ children }: PropsWithChildren) {
  return <Provider value={client}>{children}</Provider>
}
