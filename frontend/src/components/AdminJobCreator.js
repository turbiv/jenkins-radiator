import React, {useState, useEffect} from "react"
import {postNewJob} from "../services/radiator"
import {postNewJenkins, getAllJenkins} from "../services/jenkins"
import {SaveButton} from "../common/Buttons"
import "../css/table.css"
import {createNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux"

const AdminJobCreator = (props) => {

  const [newJob, setNewJob] = useState({name: "", path: "", jenkins: ""})
  const [newJenkinsData, setNewJenkinsData] = useState({name: "", url: "", token: ""})
  const [allJenkinses, setAllJenkinses] = useState([])
  const [jenkinsOptions, setJenkinsOptions] = useState([])

  useEffect(() => {
    getAllJenkins().then((response) => {
      console.log(response)
      setAllJenkinses(response)
      setJenkinsOptions(response)
    })
  }, [])

  const handleJobNameChange = (event) => {
    switch (event.target.name) {
      case "name":{
        setNewJob({...newJob, name: event.target.value})
        break;
      }
      case "path":{
        setNewJob({...newJob, path: event.target.value})
        break;
      }
      default:
        break;
    }
  }

  const handleJobSubmit = async () => {

    if(newJob.name === "" || newJob.path === "" || newJob.jenkins === ""){
      props.createNotification("Please check job details.", "fail")
      return
    }

    let path = newJob.path

    if(path.slice(0) === "/"){
      path = url.substring(1, path.length)
    }

    const formattedJob = {
      ...newJob,
      path,
      owner: props.login.id,
    }

    await postNewJob(formattedJob)
      .then(() => {
        props.createNotification(`Job ${newJob.name} successfully created`, "success")
        history.push("/admin/jobs")
      })
      .catch(() => props.createNotification("Unable to create job", "fail"))
  }

  const handleJenkinsSelectionChange = (event) => {
    setNewJob({...newJob, jenkins: event.target.value})
  }

  const findJenkinsUrl = (event) => {
    event.preventDefault()
    const filtered = allJenkinses.filter(jenkins => jenkins.name.includes(event.target.value))
    setJenkinsOptions(filtered)
  }

  const handleJenkinsSubmit = async () => {
    setJenkinsOptions([...allJenkinses, newJenkinsData])

    if(newJenkinsData.name === "" || newJenkinsData.url === ""){
      props.createNotification("Please check jenkins details.", "fail")
      return
    }

    let url = newJenkinsData.url

    if(url.slice(url.length - 1) === "/"){
      url = url.substring(0, url.length - 1)
    }

    await postNewJenkins({...newJenkinsData, url})
      .then(() =>  props.createNotification(`Jenkins ${newJenkinsData.name} successfully created`, "success"))
      .catch(() => props.createNotification("Unable to add jenkins", "fail"))
  }

  const handleNewJenkinsData = (event) => {
    switch (event.target.name) {
      case "name":{
        setNewJenkinsData({...newJenkinsData, name: event.target.value})
        break;
      }
      case "url":{
        setNewJenkinsData({...newJenkinsData, url: event.target.value})
        break;
      }
      case "token":{
        setNewJenkinsData({...newJenkinsData, token: event.target.value})
        break;
      }
      default:
        break;
    }


  }

  return(
    <div>
      <div>
        <h2>Create a job</h2>
        <form>
          <label>Job name:</label><br/>
          <input type={"text"} name={"name"} value={newJob.name} onChange={handleJobNameChange}/><br/><br/>
          <label>Job path (in jenkins):</label><br/>
          <input type={"text"} name={"path"} value={newJob.url} onChange={handleJobNameChange}/><br/><br/>

          <label>Search for jenkins:</label><br/>
          <input type={"text"} name={"jenkins"} onChange={findJenkinsUrl} /><br/>

          <table className="layout display responsive-table">
            <thead>
              <tr>
                <th colSpan={2}>Name</th>
                <th>URL</th>
              </tr>
            </thead>

            <tbody>
              {
                jenkinsOptions.map((jenkins, index) => {
                  return(
                    <tr key={index}>
                    <td className="check-box-col">
                      <input
                        type={"radio"}
                        onChange={handleJenkinsSelectionChange}
                        value={jenkins.id}
                        name={"jenkins"}
                        checked={jenkins.id === newJob.jenkins}
                      />
                    </td>
                      <td className="title-col">{jenkins.name}</td>
                      <td className="title-col">{jenkins.url}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

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
          <input type={"text"} name={"url"} value={newJenkinsData.url} onChange={handleNewJenkinsData}/><br/>
          <label>
            Jenkins API token (username:token)<br/>
            Leave empty if public jenkins
          </label><br/>
          <input type={"text"} name={"token"} value={newJenkinsData.token} onChange={handleNewJenkinsData}/>
        </form>
        <SaveButton saveHandle={handleJenkinsSubmit}/>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  createNotification
}


const mapStateToProps = (state) =>{
  return{
    login: state.login,
    notification: state.notification
  }
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AdminJobCreator);
export default connectedComponent;