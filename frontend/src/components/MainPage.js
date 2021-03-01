import React from 'react'
import {Link} from 'react-router-dom'

const MainPage = () => {
  return(
    <div>
      <h2>Welcome</h2>
      <Link to={"/radiator"}>View radiators</Link><br/>
      <Link to={"/admin/"}>Admin panel</Link>
    </div>
  )
}

export default MainPage;