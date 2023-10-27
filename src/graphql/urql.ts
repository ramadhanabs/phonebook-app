import { Client, cacheExchange, fetchExchange } from "urql"

const client = new Client({
  url: "https://wpe-hiring.tokopedia.net/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: { headers: { accept: "*/*" } },
})

export default client
