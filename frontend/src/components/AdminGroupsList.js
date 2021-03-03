import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/admin-home.css"
import {getAllGroups} from "../services/radiator"
import DropdownButton from "../common/DropdownButton"
import {Button} from "../common/Buttons"

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
    <div style={{width: "65%", fontFamily: "'Roboto', sans-serif"}}>
      <div>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 2}}>
            Group name
          </p>
          <p style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
            Owner
          </p>
          <p style={{flexGrow: 1,  borderLeftStyle: "dashed"}}>
            Options
          </p>
        </div>
        {groups.map((group, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 2}}>
                <Link to={"/admin/group/" + group.id}>{group.title}<br/></Link>
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                {group.owner.name}
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                <DropdownButton title={"Options"}>
                  <Link to={`/admin/group/${group.id}`}>Edit group</Link>
                  <Link to={`/admin/group/${group.id}/settings`}>Group settings</Link>
                </DropdownButton>
              </div>
            </div>
          );
        })}
      </div>
      <Link to={"/admin/groups/new"}><Button buttonText={"New Group"}/></Link>
    </div>
  );
}

export default AdminGroupsList;