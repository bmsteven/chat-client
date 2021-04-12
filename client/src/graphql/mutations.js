import { gql } from "@apollo/client"

export const REGISTER_USER = gql`
  mutation register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      verified
      token
      verification_code
    }
  }
`

export const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($code: Int!) {
    verifyAccount(code: $code) {
      verified
      token
    }
  }
`

export const ADD_USERNAME = gql`
  mutation addUsername($username: String!) {
    addUsername(username: $username) {
      verified
      token
      verification_code
      username
    }
  }
`

export const ADD_DP = gql`
  mutation addDp($dp: Upload!) {
    addDp(dp: $dp) {
      filename
      mimetype
      encoding
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $username: String!
    $chatId: Int
    $content: String!
    $media: String
    $media_type: String
    $parentId: Int
    $links: [String]
  ) {
    sendMessage(
      username: $username
      chatId: $chatId
      content: $content
      media: $media
      media_type: $media_type
      links: $links
      parentId: $parentId
    ) {
      id
    }
  }
`

export const UPDATE_LAST_SEEN = gql`
  mutation updateLastSeen($now: Date!) {
    updateLastSeen(now: $now) {
      first_name
    }
  }
`
