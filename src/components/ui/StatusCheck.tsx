import React from "react"
import loadingGif from "../../assets/images/ui/loading.gif"

interface StatusCheckProps {
  status: "" | "idle" | "loading" | "succeeded" | "failed"
  children: React.ReactNode
  errorMsg?: string
  className?: string
  loadingStyles?: string
}

const StatusCheck: React.FC<StatusCheckProps> = ({
  status,
  children,
  errorMsg = "Something went wrong",
  className = "",
  loadingStyles = "",
}) => {
  if (status === "succeeded") return <>{children}</>

  return (
    <div
      className={` ${
        status === "loading" || status === "failed"
          ? `flex justify-center items-center ${loadingStyles || "min-h-screen"}`
          : className
      } `}
    >
      {status === "failed" ? (
        <h2 className="text-center text-[24px]">{errorMsg}</h2>
      ) : (
        <img className={`w-[200px] h-[200px]`} src={loadingGif} alt="loading" />
      )}
    </div>
  )
}

export default StatusCheck
