import React from "react"
import {Route} from 'react-router-dom'
import Sidebar from "./Sidebar"
import AdminHome from "./AdminHome"
import AdminRadiatorEditor from "./AdminRadiatorEditor"
import {getRadiatorById, getCategoryById} from "../services/radiator"
import AdminGroupEditor from "./AdminGroupEditor"
import AdminRadiatorGroupsList from "./AdminRadiatorGroupsList"
import AdminGroupsList from "./AdminGroupsList"
import AdminJobsList from "./AdminJobsList"
import AdminJobCreator from "./AdminJobCreator"
import AdminGroupCreator from "./AdminGroupCreator"


const AdminRouter = () => {

  const getRadiator = async (id) => {
    //props.radiator.radiators.find(rad => rad.id === id)
    return await getRadiatorById(id) // Get single radiator straight from backend (less data to check by just asking for 1 radiator)
  }

  const getCategory = async (id) => {
    return await getCategoryById(id)
  }


  return (
    <div >
      <Sidebar/>
      <div style={{marginLeft: 170}}>
        <Route exact path={"/admin/"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/home"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/groups"} render={() => <AdminGroupsList/>}/>
        <Route exact path={"/admin/groups/new"} render={() => <AdminGroupCreator/>}/>
        <Route exact path={"/admin/jobs"} render={() => <AdminJobsList/>}/>
        <Route exact path={"/admin/jobs/new"} render={() => <AdminJobCreator/>}/>
        <Route exact path={"/admin/radiator/:id"} render={({match}) => <AdminRadiatorEditor radiatorData={getRadiator(match.params.id)}/>}/>
        <Route exact path={"/admin/radiator/:id/categories"} render={({match}) => <AdminRadiatorGroupsList radiatorData={getRadiator(match.params.id)}/>}/>
        <Route exact path={"/admin/category/:id/"} render={({match}) => <AdminGroupEditor categoryData={getCategory(match.params.id)}/>}/>
      </div>
    </div>
  );
}

export default AdminRouter;