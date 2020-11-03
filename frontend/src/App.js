import React from 'react'
import {
  BrowserRouter as Router,
  Route, withRouter
} from 'react-router-dom'

import Menu from "./Menu";

const App = () => {
  return(
    <div>
      <Router>
        <Route exact path={"/"} render={() => <Menu/>}/>
      </Router>
    </div>
  )
}

export default App;