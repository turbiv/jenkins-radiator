import React from "react";
import {getAll} from "../services/radiator"
import "../css/admin-home.css"
import {Link} from "react-router-dom"
import DropdownButton from "./DropdownButton"

const AdminHome = () => {

  return (
    <div>
      <div className={"radiator-list-column"}>
        <div className={"radiator-list-header"}>
          <p style={{flexGrow: 0.2}}>
            ID
          </p>
          <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
            Radiator name
          </p>
          <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
            Owner
          </p>
          <p style={{flexGrow: 1}}>
            Options
          </p>
        </div>
        {getAll().radiators.map((radiator, index)=>{
          return(
            <div className={"radiator-list-box"} id={index}>
              <p style={{flexGrow: 0.2}}>
                {radiator.id}
              </p>
              <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
                <Link to={"/radiator/" + radiator.id}>{radiator.name}<br/></Link>
              </p>
              <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
                {radiator.owner}
              </p>
              <p style={{flexGrow: 1}}>
                <DropdownButton title={"Options"}>
                  <Link to={"/admin/radiator/" + radiator.id}>Edit radiator</Link>
                  <Link to={"/admin/radiator/" + radiator.id}>Edit radiator groups</Link>
                  <Link to={"/admin/radiator/" + radiator.id}>Edit radiator jobs</Link>
                </DropdownButton>
              </p>
            </div>
          );
        })}

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