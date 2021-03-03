import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/admin-home.css"
import {getAllJobs} from "../services/radiator"
import {Button} from "../common/Buttons"

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
      <div>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 2}}>
            Job name
          </p>
          <p style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
            Owner
          </p>
        </div>
        {jobs.map((job, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 2}}>
                {job.name}
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                {job.owner.name}
              </div>
            </div>
          );
        })}
      </div>
      <Link to={"/admin/jobs/new"}><Button buttonText={"New Job"}/></Link>
    </div>
  );
}

export default AdminJobsList;