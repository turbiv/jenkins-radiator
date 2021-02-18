import React, {useState} from "react"
import {postNewJob} from "../services/radiator"
import {postNewJenkins} from "../services/jenkins"
import {SaveButton} from "../common/Buttons"

const AdminJobCreator = () => {

  const [jobName, setJobName] = useState("")
  const [jenkinsUrl, setJenkinsUrl] = useState("")
  const [newJenkinsData, setNewJenkinsData] = useState({name: "", url: ""})

  const handleJobNameChange = (event) => {
    setJobName(event.target.value)
  }

  const handleJobSubmit = async () => {
    const generatedPayload = {
      text: jobName
    }

    await postNewJob(generatedPayload)
  }

  const handleJenkinsUrlChange = () => {

  }

  const handleJenkinsSubmit = async () => {
    await postNewJenkins(newJenkinsData)
  }

  const handleNewJenkinsData = (event) => {
    if(event.target.name === "name"){
      setNewJenkinsData({...newJenkinsData, name: event.target.value})
    }else{
      setNewJenkinsData({...newJenkinsData, url: event.target.value})
    }
  }

  return(
    <div>
      <div>
        <h2>Create a job</h2>
        <form>
          <label>Job name:</label><br/>
          <input type={"text"} name={"name"} value={jobName} onChange={handleJobNameChange}/><br/><br/>

          <label>Search for jenkins:</label><br/>
          <input type={"text"} name={"jenkins"} value={jenkinsUrl} onChange={handleJenkinsUrlChange} /><br/>
          <select value={"localhost2"} id={"select-jenkins"} >
            <option value={"localhost1"}>LocalHost1</option>
            <option value={"localhost2"}>LocalHost2</option>
            <option value={"localhost3"}>LocalHost3</option>
          </select>

          <br/>
        </form>
        <SaveButton saveHandle={handleJobSubmit}/>
      </div>
      <div>
        <h2>Add a jenkins</h2>
        <form onSubmit={handleJenkinsSubmit}>
          <label>Jenkins name</label><br/>
          <input type={"text"} name={"name"} value={newJenkinsData.name} onChange={handleNewJenkinsData}/><br/>
          <label>Jenkins URL </label><br/>
          <input type={"text"} name={"url"} value={newJenkinsData.url} onChange={handleNewJenkinsData}/>
        </form>
        <SaveButton saveHandle={handleJenkinsSubmit}/>
      </div>
    </div>
  );
}

export default AdminJobCreator;