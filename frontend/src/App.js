import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Menu from "./components/Menu";
import Radiator from "./common/Radiator";
import {getRadiatorById} from "./services/radiator"
import MainPage from "./components/MainPage"
import AdminRouter from "./components/AdminRouter"

const App = () => {

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

export default App;