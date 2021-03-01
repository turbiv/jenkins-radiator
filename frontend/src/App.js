import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Menu from "./components/Menu";
import RadiatorView from "./components/RadiatorView";
import MainPage from "./components/MainPage"
import AdminRouter from "./components/AdminRouter"

const App = () => {

  return(
    <div>
      <Router>
        <Route exact path={"/"} render={() => <MainPage/>}/>
        <Route exact path={"/radiator"} render={() => <Menu/>}/>
        <Route path={"/radiator/:id"} render={({match}) => <RadiatorView radiatorId={match.params.id}/>}/>
        <Route path={"/admin"} render={() => <AdminRouter/>}/>
      </Router>
    </div>
  )
}

export default App;