import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Menu from "./components/Menu";
import {connect} from "react-redux"
import {initializeRadiators} from "./reducers/radiatorReducer"
import Radiator from "./common/Radiator";
import {getRadiatorById} from "./services/radiator"
import MainPage from "./components/MainPage"
import AdminRouter from "./components/AdminRouter"
import Test from "./components/Test"


const App = (props) => {

  const getRadiator = (id) =>{
    //props.radiator.radiators.find(rad => rad.id === id)
    return getRadiatorById() // Get single radiator straight from backend (less data to check by just asking for 1 radiator)
  }

  return(
    <div>
      <Router>
        <Route exact path={"/"} render={() => <MainPage/>}/>
        <Route exact path={"/radiator"} render={() => <Menu/>}/>
        <Route path={"/radiator/:id"} render={({match}) => <Radiator radiatorData={getRadiator(match.params.id)}/>}/>
        <Route path={"/admin"} render={() => <AdminRouter/>}/>
      </Router>
    </div>
  )
}

const mapDispatchToProps = {
  initializeRadiators
}

const mapStateToProps = (state) =>{
  return{
    radiator: state.radiator
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default connectedApp;