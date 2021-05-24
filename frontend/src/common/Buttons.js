import React, {useState} from "react"
import {useTranslation} from "react-i18next"

export const SaveButton = ({buttonText, saveHandle}) => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (event) => {
    event.preventDefault()
    setIsLoading(true)
    saveHandle().then(() => setIsLoading(false))
  }

  if(isLoading){
    return(
      <div>
        <p>{t("loading")}</p>
      </div>
    )
  }

  return(
    <div>
      <button onClick={handleSave}>{buttonText || t("save")}</button>
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
