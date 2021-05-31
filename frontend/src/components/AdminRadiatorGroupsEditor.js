import React, {useEffect, useState} from "react"

const AdminRadiatorGroupsEditor = ({radiatorData}) => {

  const [radiator, setRadiator] = useState(null)
  const [radiatorStatus, setRadiatorStatus] = useState(null)

  useEffect(() => {
    radiatorData.then((response) => {
      console.log(response)
      setRadiator(response)
    }).catch((error) => {
      setRadiatorStatus(error)
    })
  }, [])

  return(
    <div>
      <p>test</p>
    </div>
  );
}

export default AdminRadiatorGroupsEditor;