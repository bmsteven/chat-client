import React from "react"
import Cookies from "js-cookie"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
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

const client = new ApolloClient({
  // uri: "http://localhost:4000",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const ApolloProvider = (props) => {
  return <Provider client={client} {...props} />
}

export default ApolloProvider
