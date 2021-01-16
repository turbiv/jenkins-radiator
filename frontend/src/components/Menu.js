import React from 'react'
import Radiator from "../common/Radiator"
import {getAll} from "../services/radiator"
import {Link} from 'react-router-dom'

const Menu = () => {
  return(
    <div>
      <h2>Radiators</h2>
      {getAll().radiators.map(radiator => <Link to={"/radiator/" + radiator.id}>Radiator {radiator.id}<br/></Link>)}
    </div>
  )
}

export default Menu;