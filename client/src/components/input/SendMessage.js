import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"

const SEND_MESSAGE = gql`
  mutation sendMessage(
    $id: Int!
    $chatId: Int
    $content: String!
    $media: String
    $media_type: String
    $links: [String]
  ) {
    sendMessage(
      id: $id
      chatId: $chatId
      content: $content
      media: $media
      media_type: $media_type
      links: $links
    ) {
      content
      createdAt
      senderId
      recipientId
    }
  }
`

const SendMessage = ({ id, setMessages, messages }) => {
  const [content, setContent] = useState(null)

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted(res) {
      console.log(res)
      setMessages([...messages, res.sendMessage])
      setContent("")
    },
    onError(err) {
      console.log(err)
    },
  })
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    sendMessage({
      variables: {
        id,
        content,
      },
    })
  }
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        background: "white",
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <textarea
          name="content"
          placeholder="Send a message"
          onChange={(e) => handleChange(e)}
          value={content}
          style={{
            width: "500px",
            maxWidth: "80%",
            height: "70px",
          }}
        />
        <button
          disabled={loading}
          style={{
            height: "70px",
          }}
        >
          {loading ? "Sending" : "Send"}
        </button>
      </form>
    </div>
  )
}

export default SendMessage
