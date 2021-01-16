import React, {useState} from "react"
import {postNewJob} from "../services/radiator"

const AdminJobCreator = () => {

  const [jobName, setJobName] = useState("")

  const handleJobNameChange = (event) => {
    setJobName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      text: jobName
    }

    await postNewJob(generatedPayload)
  }

  return(
    <div>
      <h2>Job creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Job name:</label><br/>
        <input type={"text"} name={"name"} value={jobName} onChange={handleJobNameChange}/><br/>
        <input type={"submit"} value={"Submit"}/>
      </form>
    </div>
  );
}

export default AdminJobCreator;