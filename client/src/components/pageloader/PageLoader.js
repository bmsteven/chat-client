import React from "react"

const PageLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader-page">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
