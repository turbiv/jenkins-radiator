import React, {useState, useEffect} from "react"
import {postNewJob} from "../services/radiator"
import {postNewJenkins, getAllJenkins} from "../services/jenkins"
import {SaveButton} from "../common/Buttons"
import "../css/table.css"
import {createNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"
import {useTranslation} from "react-i18next"

const AdminJobCreator = (props) => {

  const [newJob, setNewJob] = useState({name: "", path: "", jenkins: ""})
  const [newJenkinsData, setNewJenkinsData] = useState({name: "", hostname: "", port: "80", token: ""})
  const [allJenkinses, setAllJenkinses] = useState([])
  const [jenkinsOptions, setJenkinsOptions] = useState([])
  const history = useHistory()
  const { t, i18n } = useTranslation();

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

    if(!newJob.name || !newJob.path || !newJob.jenkins){
      props.createNotification(t("jobError"), "fail")
      return
    }

    let path = newJob.path

    if(!path.startsWith("/")){
      path = "/" + path
    }

    if(path.endsWith("/")){
      path = path.substring(0, path.length - 1)
    }

    const formattedJob = {
      ...newJob,
      path,
      owner: props.login.id,
    }

    await postNewJob(formattedJob)
      .then(() => {
        props.createNotification(t("jobCreated", {job_name: newJob.name}), "success")
        history.push("/admin/jobs")
      })
      .catch(() => props.createNotification(t("jobCreationError"), "fail"))
  }

  const handleJenkinsSelectionChange = (event) => {
    setNewJob({...newJob, jenkins: event.target.value})
  }

  const findJenkinsHostname = (event) => {
    event.preventDefault()
    const filtered = allJenkinses.filter(jenkins => jenkins.name.includes(event.target.value))
    setJenkinsOptions(filtered)
  }

  const handleJenkinsSubmit = async () => {
    setJenkinsOptions([...allJenkinses, newJenkinsData])

    if(!newJenkinsData.name || !newJenkinsData.hostname || newJenkinsData.port === ""){
      props.createNotification(t("jenkinsError"), "fail")
      return
    }

    let hostname = newJenkinsData.hostname

    if(hostname.endsWith("/")){
      hostname = hostname.substring(0, hostname.length - 1)
    }

    await postNewJenkins({...newJenkinsData, hostname})
      .then(() =>  props.createNotification(t("jenkinsAdded", {jenkins_name: newJenkinsData.name}), "success"))
      .catch(() => props.createNotification(t("jenkinsAddFail"), "fail"))
  }

  const handleNewJenkinsData = (event) => {
    switch (event.target.name) {
      case "name":{
        setNewJenkinsData({...newJenkinsData, name: event.target.value})
        break;
      }
      case "hostname":{
        setNewJenkinsData({...newJenkinsData, hostname: event.target.value})
        break;
      }
      case "token":{
        setNewJenkinsData({...newJenkinsData, token: event.target.value})
        break;
      }
      case "port":{
        setNewJenkinsData({...newJenkinsData, port: event.target.value})
        break;
      }
      default:
        break;
    }


  }

  return(
    <div>
      <div>
        <h2>{t("createJob")}</h2>
        <form>
          <label>{t("jobName")}</label><br/>
          <input type={"text"} name={"name"} value={newJob.name} onChange={handleJobNameChange}/><br/><br/>
          <label>{t("jobPath")}</label><br/>
          <input type={"text"} name={"path"} value={newJob.path} onChange={handleJobNameChange}/><br/><br/>

          <label>{t("searchJenkins")}</label><br/>
          <input type={"text"} name={"jenkins"} onChange={findJenkinsHostname} /><br/>

          <table className="layout display responsive-table">
            <thead>
              <tr>
                <th colSpan={2}>{t("name")}</th>
                <th>{t("hostname")}</th>
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
                      <td className="title-col">{jenkins.hostname + ":" + jenkins.port}</td>
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
        <h2>{t("addJenkins")}</h2>
        <form onSubmit={handleJenkinsSubmit}>
          <label>{t("jenkinsName")}</label><br/>
          <input type={"text"} name={"name"} value={newJenkinsData.name} onChange={handleNewJenkinsData}/><br/>
          <label>{t("jenkinsHostname")}</label><br/>
          <input type={"text"} name={"hostname"} value={newJenkinsData.hostname} onChange={handleNewJenkinsData}/><br/>
          <label>{t("jenkinsPort")}</label><br/>
          <input type={"text"} name={"port"}  value={newJenkinsData.port} onChange={handleNewJenkinsData}/><br/>

          <label>
            {t("jenkinsToken")}
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