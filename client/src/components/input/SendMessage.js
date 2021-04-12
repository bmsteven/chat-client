import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAuthState } from "../../context/auth"
import {
  IoMdAttach,
  AiOutlineSend,
  AiOutlineLoading3Quarters,
} from "react-icons/all"
import { useMutation } from "@apollo/client"
import { SEND_MESSAGE } from "../../graphql/mutations"
import "./message-box.sass"

const SendMessage = ({
  username,
  repliedMessage,
  setRepliedMessage,
  setOpenMedia,
}) => {
  const { user } = useAuthState()
  const [content, setContent] = useState("")
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted(res) {
      setContent("")
      reset()
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
        username,
        content,
        parentId: repliedMessage?.id,
      },
    })
  }

  const reset = () => {
    setRepliedMessage()
  }

  const open = () => {
    setOpenMedia(true)
  }

  return (
    <div className="send-message-box">
      {repliedMessage && (
        <div className="replied-message">
          <AiOutlineClose className="icon" onClick={reset} />
          <a href={`#${repliedMessage.id}`}>
            {user.id === repliedMessage.senderId ? (
              <div className="sender">You:</div>
            ) : (
              <div className="sender">{username}:</div>
            )}
            <p className="content">{repliedMessage.content}</p>
          </a>
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <span className="file-upload" onClick={open}>
          <IoMdAttach className="icon" />
        </span>
        <textarea
          name="content"
          placeholder="Send a message"
          onChange={(e) => handleChange(e)}
          value={content}
        />
        <button disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="icon loader" />
          ) : (
            <AiOutlineSend className="icon" />
          )}
        </button>
      </form>
    </div>
  )
}

export default SendMessage
