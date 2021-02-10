import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/table.css"
import {getUser} from "../services/users"
import {SaveButton} from "../common/Buttons"

const AdminAccountSettings = ({accountId}) => {

  const [user, setUser] = useState(null)
  const [userPermissions, setUserPermissions] = useState(null)

  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    getUser(accountId).then((response) => {
      console.log(response)
      setUser(response)
      setUserPermissions(response.permissions)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  const handleUserSettingSave = async () => {
    return
  }

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  if(!userPermissions || !user){
    return(
      <div>
        Loading user settings...
      </div>
    )
  }

  console.log("permissions", userPermissions)
  return(
    <div style={{margin: "auto", width: "50%", textAlign: "center"}}>
      <form onSubmit={handleUserSettingSave}>
        <table style={{marginLeft: "auto", marginRight: "auto"}} className="layout display responsive-table">
          <thead>
            <tr>
              <th/>
              <th>Permission</th>
              <th/>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td className="title-col">Read jobs</td>
            <td className="check-box-col">
              <input
              type={"radio"}
              onChange={() => null}
              value={userPermissions.read_jobs}
              name={"read_jobs"}
              />
              <input
                type={"radio"}
                onChange={() => null}
                value={userPermissions.read_jobs}
                name={"read_jobs"}
              />
              <input
                type={"radio"}
                onChange={() => null}
                value={userPermissions.read_jobs}
                name={"read_jobs"}
              />
            </td>
          </tr>
          </tbody>
        </table>
        <table style={{marginLeft: "auto", marginRight: "auto"}} className="layout display responsive-table">


        </table>
      </form>

    </div>
  );
}

export default AdminAccountSettings;