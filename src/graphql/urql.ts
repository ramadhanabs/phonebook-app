import { Client, cacheExchange, fetchExchange } from "urql"

const client = new Client({
  url: "https://wpe-hiring.tokopedia.net/graphql",
  exchanges: [cacheExchange, fetchExchange],
})

export default client
