import React from "react";
import "../css/admin-home.css"

const AdminHome = () => {
  return (
    <div>
      <div className={"radiator-list-column"}>
        <div className={"radiator-list-container"}>
          <div className={"radiator-list-box"}>
            <p style={{flexGrow: 0.2}}>
              ID: <br/>
              10
            </p>
            <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
              Radiator name:<br/>
              Name
            </p>
            <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
              Owner: <br/>
              Name
            </p>
            <p style={{flexGrow: 1}}>
              Edit
            </p>
          </div>


          <div className={"radiator-list-box"}>
            <p style={{flexGrow: 0.2}}>
              ID: <br/>
              10
            </p>
            <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
              Radiator name:<br/>
              Name
            </p>
            <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
              Owner: <br/>
              Name
            </p>
            <p style={{flexGrow: 1}}>
              Edit
            </p>
          </div>

          <div className={"radiator-list-box"}>
            <p style={{flexGrow: 0.2}}>
              ID: <br/>
              10
            </p>
            <p style={{flexGrow: 3, borderLeftStyle: "dashed"}}>
              Radiator name:<br/>
              Name
            </p>
            <p style={{flexGrow: 1, borderLeftStyle: "dashed", borderRightStyle: "dashed"}}>
              Owner: <br/>
              Name
            </p>
            <p style={{flexGrow: 1}}>
              Edit
            </p>
          </div>
        </div>
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