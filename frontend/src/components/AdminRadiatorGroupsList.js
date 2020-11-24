import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"

const AdminRadiatorGroupsList = ({radiatorData}) => {

  const [categories, setCategories] = useState([])
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(async () => {
    radiatorData.then((response) => {
      console.log(response)
      setCategories(response.categories)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  return(
    <div>
      <h2>Categories:</h2>
      {categories.map((category, index) => <Link key={index} to={`/admin/category/${category.id}`}>{category.title}<br/></Link>)}
    </div>
  );
}

export default AdminRadiatorGroupsList;