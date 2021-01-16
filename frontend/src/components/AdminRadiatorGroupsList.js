import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "../css/table.css"
import {getAllGroups, putRadiator} from "../services/radiator"
import {SaveButton} from "../common/Buttons"

const AdminRadiatorGroupsList = ({radiatorData}) => {

  const [allRadiatorGroups, setAllRadiatorGroups] = useState([])
  const [groupsToAdd, setGroupsToAdd] = useState([])

  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    radiatorData.then((response) => {
      console.log(response)
      setGroupsToAdd(response.groups.map((group) => group.id))
    }).catch((error) => {
      setRadiatorStatus(error)
    })

    getAllGroups()
      .then(response => setAllRadiatorGroups(response))
      .catch(() => setAllRadiatorGroups([]))

  }, [])

  const handleAdditionOfGroups = (event) => {
    event.preventDefault()
    console.log(groupsToAdd)
  }

  const handleCheckboxChange = (event) => {
    const target = event.target
    if(target.checked){
      setGroupsToAdd([...groupsToAdd, Number(target.value)]) //TODO: remove number when using objectid
    }else{
      setGroupsToAdd(groupsToAdd.filter((id) => id !== Number(target.value)))
    }
  }

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return(
    <div>
      <form onSubmit={handleAdditionOfGroups}>
        <table className="layout display responsive-table">
          <thead>
          <tr>
            <th/>
            <th>Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            allRadiatorGroups.map((group, index) => {
              return(
                <tr key={index}>
                  <td className="check-box-col"><input
                    type={"checkbox"}
                    onChange={handleCheckboxChange}
                    name={group.title}
                    value={group.id}
                    checked={groupsToAdd.includes(group.id)}
                  /></td>
                  <td className="title-col">{group.title}</td>
                  <td className="title-col"><Link key={index} to={`/admin/group/${group.id}`}>Edit</Link></td>
                </tr>
              )}
            )
          }
          </tbody>
        </table>
        <input type={"submit"} value={"Add selected items"} />
      </form>

    </div>
  );
}

export default AdminRadiatorGroupsList;