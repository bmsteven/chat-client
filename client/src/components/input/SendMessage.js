import React, { useState } from "react"
import {
  IoMdAttach,
  AiOutlineSend,
  AiOutlineLoading3Quarters,
} from "react-icons/all"
import { useMutation } from "@apollo/client"
import { SEND_MESSAGE } from "../../graphql/mutations"
import "./message-box.sass"

const SendMessage = ({ username }) => {
  const [content, setContent] = useState("")

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted(res) {
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
        username,
        content,
      },
    })
  }
  return (
    <div className="send-message-box">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input id="file" type="file" />
        <label className="file-upload" htmlFor="file">
          <IoMdAttach className="icon" />
        </label>
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
