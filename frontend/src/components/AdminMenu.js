import React from "react";
import {Route} from 'react-router-dom'
import {Container, Row, Col} from "react-bootstrap";
import Sidebar from "./Sidebar"

const AdminMenu = () => {
  return (
    <div>
      <Sidebar/>
      <div style={{marginLeft: 250}}>
        <p>Do you see me?</p>
      </div>
      <Route exact path="/admin/users"/>
      <Route exact path="/admin/groups"/>
    </div>
  );
}

export default AdminMenu;