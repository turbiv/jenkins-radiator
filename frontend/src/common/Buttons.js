import React, {useState} from "react"

export const SaveButton = ({buttonText, saveHandle}) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (event) => {
    event.preventDefault()
    setIsLoading(true)
    saveHandle().then(() => setIsLoading(false))
  }

  if(isLoading){
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return(
    <div>
      <button onClick={handleSave}>{buttonText || "Save"}</button>
    </div>
  )
}

export const Button = ({buttonText, onClick}) => {
  return(
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  )
}
