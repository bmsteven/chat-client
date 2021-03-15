import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import ApolloProvider from "./utils/ApolloProvider"
import { AuthProvider } from "./context/auth"
import { ChatsProvider } from "./context/chats"
import PageLoader from "./components/pageloader/PageLoader"

ReactDOM.render(
  <ApolloProvider>
    <AuthProvider>
      <ChatsProvider>
        <React.Suspense fallback={<PageLoader />}>
          <Router>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Router>
        </React.Suspense>
      </ChatsProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
)
serviceWorker.register()
