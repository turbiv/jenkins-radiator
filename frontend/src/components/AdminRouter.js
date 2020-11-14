import React from "react";
import {Route} from 'react-router-dom'
import Sidebar from "./Sidebar"
import AdminHome from "./AdminHome"
import Test from "./Test"

const AdminRouter = () => {


  return (
    <div >
      <Sidebar/>
      <div style={{marginLeft: 250}}>
        <Route exact path={"/admin/home"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/jobs"} render={() => <Test/>}/>
      </div>
    </div>
  );
}

export default AdminRouter;