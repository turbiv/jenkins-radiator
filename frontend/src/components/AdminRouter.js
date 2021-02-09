import React, {useState} from "react"
import {connect} from "react-redux"
import {Route} from 'react-router-dom'
import Sidebar from "../common/Sidebar"
import AdminHome from "./AdminHome"
import AdminRadiatorEditor from "./AdminRadiatorEditor"
import {getRadiatorById, getGroupById} from "../services/radiator"
import AdminGroupEditor from "./AdminGroupEditor"
import AdminRadiatorSettings from "./AdminRadiatorSettings"
import AdminGroupsList from "./AdminGroupsList"
import AdminJobsList from "./AdminJobsList"
import AdminJobCreator from "./AdminJobCreator"
import AdminGroupCreator from "./AdminGroupCreator"
import AdminRadiatorCreator from "./AdminRadiatorCreator"
import AdminGroupSettings from "./AdminGroupSettings"
import Login from "./Login"
import {setUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";


const AdminRouter = (props) => {
  const [registerPage, setRegisterPage] = useState(false)

  const getRadiator = async (id) => {
    //props.radiator.radiators.find(rad => rad.id === id)
    return await getRadiatorById(id) // Get single radiator straight from backend (less data to check by just asking for 1 radiator)
  }

  const getGroup = async (id) => {
    return await getGroupById(id)
  }

  if(!props.login){
    return(
      <div>
        {props.notification}
        <Login register={registerPage}/>
        <button onClick={() => setRegisterPage(!registerPage)}>{registerPage ? "Login as existing user" : "Register new user"}</button>
      </div>
    )
  }


  return (
    <div >
      <Sidebar/>
      <div style={{marginLeft: 170}}>
        {props.notification}
        <Route exact path={"/admin/"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/home"} render={() => <AdminHome/>}/>
        <Route exact path={"/admin/groups"} render={() => <AdminGroupsList/>}/>
        <Route exact path={"/admin/groups/new"} render={() => <AdminGroupCreator/>}/>
        <Route exact path={"/admin/jobs"} render={() => <AdminJobsList/>}/>
        <Route exact path={"/admin/jobs/new"} render={() => <AdminJobCreator/>}/>
        <Route exact path={"/admin/radiators/new"} render={() => <AdminRadiatorCreator/>}/>
        <Route exact path={"/admin/radiator/:id"} render={({match}) => <AdminRadiatorEditor radiatorData={getRadiator(match.params.id)}/>}/>
        <Route exact path={"/admin/radiator/:id/settings"} render={({match}) => <AdminRadiatorSettings radiatorData={getRadiator(match.params.id)}/>}/>
        <Route exact path={"/admin/group/:id/"} render={({match}) => <AdminGroupEditor groupData={getGroup(match.params.id)}/>}/>
        <Route exact path={"/admin/group/:id/settings"} render={({match}) => <AdminGroupSettings groupData={getGroup(match.params.id)}/>}/>
      </div>
    </div>
  );
}


const mapStateToProps = (state) =>{
  return{
    login: state.login,
    notification: state.notification
  }
};

const connectedAdminRouter = connect(mapStateToProps)(AdminRouter);
export default connectedAdminRouter;