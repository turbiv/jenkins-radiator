import React from "react";
import { Route } from 'react-router-dom'
import Sidebar from "./Sidebar"
import AdminHome from "./AdminHome"
import AdminEditor from "./AdminEditor"
import { getRadiatorById } from "../services/radiator"

const AdminRouter = () => {

  const getRadiator = (id) =>{
    //props.radiator.radiators.find(rad => rad.id === id)
    return getRadiatorById() // Get single radiator straight from backend (less data to check by just asking for 1 radiator)
  }


  return (
    <div >
      <Sidebar/>
      <div style={{marginLeft: 170}}>
        <Route exact path={"/admin/"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/home"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/radiator/:id"} render={({match}) => <AdminEditor radiatorData={getRadiator(match.params.id)}/>}/>
      </div>
    </div>
  );
}

export default AdminRouter;