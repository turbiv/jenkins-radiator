import React, {useEffect, useState} from 'react'
import {getAllPublic} from "../services/public"
import {Link} from 'react-router-dom'

const Menu = () => {

  const [radiators, setRadiators] = useState([])

  useEffect(() => {
    getAllPublic().then( (response) => {
        setRadiators(response)
      }
    ).catch((error) => {
      console.debug(error)
    })

  }, [])

  return(
    <div>
      <h2>Radiators</h2>
      {radiators.map(radiator => <Link to={"/radiator/" + radiator.id}>{radiator.name}<br/></Link>)}
    </div>
  )
}

export default Menu;