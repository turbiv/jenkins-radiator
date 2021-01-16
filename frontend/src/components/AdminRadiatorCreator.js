import React, {useState} from "react"
import {postNewRadiator} from "../services/radiator"

const AdminRadiatorCreator = () => {

  const [radiatorName, setRadiatorName] = useState("")
  const [radiatorOwner, setRadiatorOwner] = useState("")

  const handleRadiatorNameChange = (event) => {
    setRadiatorName(event.target.value)
  }

  const handleOwnerNameChange = (event) => {
    setRadiatorOwner(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      name: radiatorName,
      owner: radiatorOwner
    }

    await postNewRadiator(generatedPayload)
  }

  return(
    <div>
      <h2>Radiator creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Radiator name:</label><br/>
        <input type={"text"} name={"name"} value={radiatorName} onChange={handleRadiatorNameChange}/><br/>
        <label>Owner:</label><br/>
        <input type={"text"} name={"name"} value={radiatorOwner} onChange={handleOwnerNameChange}/><br/>
        <input type={"submit"} value={"Submit"}/>
      </form>
    </div>
  );
}

export default AdminRadiatorCreator;