import { gql } from "@apollo/client"

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      content
      createdAt
      senderId
      media
      media_type
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
        createdAt
        senderId
        media
        media_type
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

export const NEW_ONLINE_USER = gql`
  subscription userLastSeen {
    userLastSeen {
      id
      username
      dp
      last_seen
    }
  }
`
