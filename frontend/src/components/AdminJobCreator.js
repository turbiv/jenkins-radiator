import React, {useState} from "react"
import {postNewRadiator} from "../services/radiator"

const AdminJobCreator = () => {

  const [radiatorName, setRadiatorName] = useState("")

  const handleRadiatorNameChange = (event) => {
    setRadiatorName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      text: radiatorName
    }

    await postNewRadiator(generatedPayload)
  }

  return(
    <div>
      <h2>Job creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Job name:</label><br/>
        <input type={"text"} name={"name"} value={radiatorName} onChange={handleRadiatorNameChange}/><br/>
        <input type={"submit"} value={"Submit"}/>
      </form>
    </div>
  );
}

export default AdminJobCreator;