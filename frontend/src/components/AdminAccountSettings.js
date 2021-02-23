import React, {useEffect, useState} from "react"
import "../css/table.css"
import {getUser, putUser} from "../services/users"
import {SaveButton} from "../common/Buttons"

const Setting = ({settingName, permission, handleOnChange, currentLevel, permissionLevels = [0, 1, 2],}) => {

  return(
      <tr>
        <td className="title-col">{settingName}</td>
        <td className="check-box-col">
          {
            permissionLevels.map((level, index) => {
              return(
                <input
                  key={index}
                  type={"radio"}
                  onChange={handleOnChange}
                  value={level}
                  name={permission}
                  defaultChecked={currentLevel === level}
                />
              )
            })
          }
        </td>
      </tr>
      )
}


const AdminAccountSettings = ({accountId}) => {

  const [user, setUser] = useState(null)
  const [userPermissions, setUserPermissions] = useState(null)

  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect( () => {
    getUser(accountId).then((response) => {
      console.log("response", response)
      setUser(response)
      setUserPermissions(response.permissions)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  const handleUserSettingSave = async () => {
    const formattedUserData = {...user, permissions: {...userPermissions}}
    console.log(formattedUserData)
    await putUser(formattedUserData)
  }

  const handleSettingChange = (event) => {
    const copyPerms = {...userPermissions}
    copyPerms[event.target.name] = Number(event.target.value)
    event.target.checked = true

    setUserPermissions(copyPerms)
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
    <div>
      <form style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        <table className="layout display responsive-table">
          <thead>
            <tr>
              <th colSpan={2}>Write permission</th>
            </tr>
            <Setting settingName={"Write jobs"} permission={"write_jobs"} handleOnChange={handleSettingChange} currentLevel={userPermissions.write_jobs} />
            <Setting settingName={"Write groups"} permission={"write_groups"} handleOnChange={handleSettingChange} currentLevel={userPermissions.write_groups} />
            <Setting settingName={"Write radiators"} permission={"write_radiators"} handleOnChange={handleSettingChange} currentLevel={userPermissions.write_radiators} />
          </thead>

          <thead style={{marginTop: "10px"}}>
          <tr>
            <th colSpan={2}>Read permission</th>
          </tr>
            <Setting settingName={"Read jobs"} permission={"read_jobs"} handleOnChange={handleSettingChange} currentLevel={userPermissions.read_jobs} />
            <Setting settingName={"Read groups"} permission={"read_groups"} handleOnChange={handleSettingChange} currentLevel={userPermissions.read_groups} />
            <Setting settingName={"Read radiators"} permission={"read_radiators"} handleOnChange={handleSettingChange} currentLevel={userPermissions.read_radiators} />
          </thead>
          <caption style={{captionSide: "bottom"}}>Definitions to be added</caption>
        </table>

        <table style={{marginLeft: "10px"}} className="layout display responsive-table">
          <thead>
          <tr>
            <th colSpan={2}>Other permissions</th>
          </tr>
            <Setting settingName={"Modify users"} permission={"modify_users"} handleOnChange={handleSettingChange} currentLevel={userPermissions.modify_users} />
            <Setting settingName={"Administrator"} permission={"administrator"} handleOnChange={handleSettingChange} currentLevel={userPermissions.administrator} />
          </thead>
          <caption style={{captionSide: "bottom"}}>Definitions to be added</caption>
        </table>
      </form>
      <SaveButton saveHandle={handleUserSettingSave}/>
    </div>
  );
}



export default AdminAccountSettings;