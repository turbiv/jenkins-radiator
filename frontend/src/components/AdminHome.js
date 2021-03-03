import React, {useEffect, useState} from "react";
import {getAll} from "../services/radiator"
import "../css/admin-home.css"
import {Link} from "react-router-dom"
import DropdownButton from "../common/DropdownButton"

const AdminHome = () => {

  const [radiatorData, setRadiatorData] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAll().then((response) => {
      console.log(response)
      setRadiatorData(response)
      setLoading(false)
    }).catch((error) => {
      setRadiatorStatus(error)
      setLoading(false)
    })
  }, [])

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

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
        {loading ? <div>Loading...</div> : radiatorData.map((radiator, index)=>{
          return(
            <div key={index} className={"radiator-list-box"} id={index}>
              <div className={"radiator-list-box-div"} style={{flexGrow: 3}}>
                <Link to={"/radiator/" + radiator.id}>{radiator.name}<br/></Link>
              </div>

              <div className={"radiator-list-box-div"} style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
                {radiator.owner.name || "no owner"}
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

        </div>
      </div>
  );
}

export default AdminHome;