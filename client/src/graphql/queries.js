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
      last_seen
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
      last_seen
      latestMessage {
        id
        content
        createdAt
        chatId
        senderId
        recipientId
        read_status
        received_status
      }
    }
  }
`

export const GET_MESSAGES = gql`
  query getMessages($username: String!) {
    getMessages(username: $username) {
      id
      content
      media
      media_type
      createdAt
      senderId
      recipientId
      read_status
      received_status
      chatId
      sender {
        id
        dp
        username
      }
      recipient {
        id
        dp
        username
      }
      parentMsg {
        id
        content
        media
        media_type
        createdAt
        senderId
        recipientId
        read_status
        received_status
        chatId
        sender {
          id
          dp
          username
        }
        recipient {
          id
          dp
          username
        }
      }
    }
  }
`

export const GET_ONLINE_USERS = gql`
  query getOnlineUsers {
    getOnlineUsers {
      id
      username
      dp
      last_seen
    }
  }
`
