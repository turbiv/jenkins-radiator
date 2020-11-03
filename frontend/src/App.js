import React, {useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route, withRouter
} from 'react-router-dom'
import Menu from "./components/Menu";
import {connect} from "react-redux"
import {initializeRadiators} from "./reducers/radiatorReducer"


const App = (props) => {

  useEffect(()=>{
    props.initializeRadiators()
  },[])

  return(
    <div>
      <Router>
        <Route exact path={"/"} render={() => <Menu/>}/>
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