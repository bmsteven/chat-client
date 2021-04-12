import React from "react"
import "./sendmedia.sass"

const SendMedia = ({ openMedia, setOpenMedia, repliedMessage }) => {
  const close = () => {
    setOpenMedia(false)
  }
  return (
    <div className={openMedia ? "send-media open" : "send-media"}>
      Will use this component to send multiple media
      <div onClick={close}>X</div>
    </div>
  )
}

export default SendMedia
