import React, {useEffect, useState} from "react";
import {getAll} from "../services/radiator"
import "../css/admin-home.css"
import {Link} from "react-router-dom"
import DropdownButton from "../common/DropdownButton"

const AdminHome = () => {

  const [radiatorData, setRadiatorData] = useState([])
  const [radiatorStastus, setRadiatorStatus] = useState(null)

  useEffect(() => {
    getAll().then((response) => {
      console.log(response)
      setRadiatorData(response)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  return (
    <div>
      <div className={"radiator-list-column"}>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 3}}>
            Radiator name
          </p>
          <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
            Owner
          </p>
          <p style={{flexGrow: 1}}>
            Options
          </p>
        </div>
        {radiatorData.map((radiator, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3}}>
                <Link to={"/radiator/" + radiator.id}>{radiator.name}<br/></Link>
              </div>

              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
                {radiator.owner || "no owner"}
              </div>

              <div className={"radiator-list-box-div"} style={{flexGrow: 1}}>
                <DropdownButton title={"Options"}>
                  <Link to={`/admin/radiator/${radiator.id}`}>Edit radiator</Link>
                  <Link to={`/admin/radiator/${radiator.id}/settings`}>Radiator settings</Link>
                </DropdownButton>
              </div>
            </div>
          );
        })}
        <Link to={"/admin/radiators/new"}><button>New radiator</button></Link>
        </div>
        <div className={"history-column"}>
          <div>
            History item
          </div>
        </div>
      </div>
  );
}

export default AdminHome;