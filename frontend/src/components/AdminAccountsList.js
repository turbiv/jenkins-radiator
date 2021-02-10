import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/admin-home.css"
import {getAllUsers, deleteUser} from "../services/users"

const AdminAccountsList = () => {

  const [users, setUsers] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    getAllUsers().then((response) => {
      setUsers(response)
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

  const handleDeleteUser = async (event) => {
    event.preventDefault()
    await deleteUser(event.target.value)
    const reformattedUsers = users.filter((user) => user.id !== event.target.value)
    setUsers(reformattedUsers)
  }

  return(
    <div style={{width: "65%", fontFamily: "'Roboto', sans-serif"}}>
      <div>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 3}}>
            Username
          </p>
          <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
            Name
          </p>
          <p style={{flexGrow: 2,  borderLeftStyle: "dashed"}}>
            Options
          </p>
        </div>
        {users.map((user, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3}}>
                {user.username}
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
                {user.name}
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                <button value={user.id} onClick={handleDeleteUser}>Delete user</button>
              </div>
              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed"}}>
                <Link to={`/admin/accounts/${user.id}/`}>Settings</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminAccountsList;