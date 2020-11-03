import React, {useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route, withRouter
} from 'react-router-dom'
import Menu from "./components/Menu";
import {connect} from "react-redux"
import {initializeRadiators} from "./reducers/radiatorReducer"
import Radiator from "./components/Radiator";


const App = (props) => {

  useEffect(()=>{
    console.log("use effect")
    props.initializeRadiators()
  },[])

  const handleButton = (event) =>{
    event.preventDefault()
    console.log(props.radiator)
  }

  const findRadiator = (id) =>{
    console.log("radiator json ", props.radiator)
    props.radiator.radiators.find(rad => rad.id === id)
  }

  return(
    <div>
      <Router>
        <Route exact path={"/"} render={() => <Menu/>}/>
        <Route exact path={"/radiator/:id"} render={({match}) => <Radiator radiatorData={findRadiator(match.params.id)}/>}/>
      </Router>
      <button onClick={handleButton}>click</button>
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