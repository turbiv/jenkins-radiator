import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {getAllGroups} from "../services/radiator"

const AdminGroupsList = () => {

  const [groups, setGroups] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    getAllGroups().then((response) => {
      console.log("Response: ", response)
      setGroups(response)
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
    <div>
      <Link to={"/admin/groups/new"}><button>New group</button></Link>
      <h2>Groups:</h2>
      {groups.map((group, index) => <Link key={index} to={`/admin/group/${group.id}`}>{group.title}<br/></Link>)}
    </div>
  );
}

export default AdminGroupsList;