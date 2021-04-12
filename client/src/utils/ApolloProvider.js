import React from "react"
import Cookies from "js-cookie"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
  split,
} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

// let httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// })

let httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  let token = Cookies.get("token")

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  }
})

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    timeout: 20000,
    lazy: true,
    connectionParams: {
      Authorization: Cookies.get("token"),
    },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const ApolloProvider = (props) => {
  return <Provider client={client} {...props} />
}

window.addEventListener("beforeunload", () => {
  wsLink.subscriptionClient.close()
})

export default ApolloProvider
