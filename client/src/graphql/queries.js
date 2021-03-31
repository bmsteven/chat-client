import { gql } from "@apollo/client"

export const GET_USER = gql`
  query auth {
    auth {
      id
      username
      verified
      verification_code
      first_name
      last_name
      dp
    }
  }
`

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`

export const GET_CHATS = gql`
  query getUserChats {
    getUserChats {
      id
      username
      dp
      status
      latestMessage {
        content
        createdAt
      }
    }
  }
`
