import React, {useState} from "react"
import {postNewGroup} from "../services/radiator"

const AdminGroupCreator = () => {

  const [groupTitle, setGroupTitle] = useState("")

  const handleGroupTitleChange = (event) => {
    setGroupTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      title: groupTitle
    }

    await postNewGroup(generatedPayload)

  }

  return(
    <div>
      <h2>Group creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Group name:</label><br/>
        <input type={"text"} name={"title"} value={groupTitle} onChange={handleGroupTitleChange}/><br/>
        <input type={"submit"} value={"Submit"}/>
      </form>
    </div>
  );
}

export default AdminGroupCreator;