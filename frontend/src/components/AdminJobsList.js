import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {getAllCategories} from "../services/radiator"

const AdminJobsList = () => {

  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
  }, [])

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return(
    <div>
      <Link to={"/admin/jobs/new"}><button>New job</button></Link>
      <h2>Jobs:</h2>
      <p>Example job</p>
    </div>
  );
}

export default AdminJobsList;