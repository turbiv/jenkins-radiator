import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/admin-home.css"
import {getAllJobs} from "../services/radiator"

const AdminJobsList = () => {

  const [jobs, setJobs] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    getAllJobs().then((response) => {
      console.log("Response: ", response)
      setJobs(response)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return(
    <div style={{width: "65%", fontFamily: "'Roboto', sans-serif"}}>
      <Link to={"/admin/jobs/new"}><button>New job</button></Link>
      <div>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 3}}>
            Job name
          </p>
          <p style={{flexGrow: 1,  borderLeftStyle: "dashed"}}>
            Options
          </p>
        </div>
        {jobs.map((job, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3}}>
                <Link to={"/admin/group/" + job.id}>{job.text}<br/></Link>
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                <Link to={`/admin/job/${job.id}/settings`}>Job settings</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminJobsList;