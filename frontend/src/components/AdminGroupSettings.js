import React, {useEffect, useState} from "react"
import {putGroup, getAllJobs} from "../services/radiator"
import {Link} from "react-router-dom"
import {SaveButton} from "../common/Buttons"
import {useHistory} from "react-router-dom"

const AdminGroupSettings = ({groupData}) => {

  const [allJobs, setAllJobs] = useState([])
  const [jobsToAdd, setJobsToAdd] = useState([])
  const [groupJson, setGroupJson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [radiatorStatus, setRadiatorStatus] = useState(null)
  const history = useHistory()

  useEffect(async () => {
    groupData.then((response) => {
      setGroupJson(response)
      setJobsToAdd([].concat(...response.jobs.map((row) => row.map(job => job.id)))) // [["1", "2", "3"], ["4","5"]]
    }).catch((error) => {
      setRadiatorStatus(error)
    })

    await getAllJobs()
      .then(response => setAllJobs(response))
      .catch(() => setAllJobs([]))

    setLoading(false)
  }, [])

  const handleAdditionOfJobs = async () => {
    const copyJobs = [...jobsToAdd]
    const formattedJobs = []
    while(copyJobs.length) formattedJobs.push(copyJobs.splice(0, 6))
    console.log({...groupJson, jobs: formattedJobs})

    await putGroup({...groupJson, owner: groupJson.owner.id, jobs: formattedJobs})

    history.push("/admin/groups")
  }

  const handleCheckboxChange = (event) => {
    const target = event.target
    if(target.checked){
      setJobsToAdd([...jobsToAdd, target.value])
    }else{
      setJobsToAdd(jobsToAdd.filter((id) => id !== target.value))
    }
  }

  if(radiatorStatus){
    return(
      <div>
        <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}} src={"https://http.cat/" + radiatorStatus} alt={"http error"}/>
      </div>
    );
  }

  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return(
    <div>
      <form onSubmit={handleAdditionOfJobs}>
        <table className="layout display responsive-table">
          <thead>
          <tr>
            <th/>
            <th>Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            allJobs.map((job, index) => {
              return(
                <tr key={index}>
                  <td className="check-box-col"><input
                    type={"checkbox"}
                    onChange={handleCheckboxChange}
                    name={job.name}
                    value={job.id}
                    checked={jobsToAdd.includes(job.id)}
                  /></td>
                  <td className="title-col">{job.name}</td>
                  <td className="title-col"><Link key={index} to={`/admin/job/${job.id}`}>Edit</Link></td>
                </tr>
              )}
            )
          }
          </tbody>
        </table>
      </form>
      <SaveButton saveHandle={handleAdditionOfJobs} />
    </div>
  );
}

export default AdminGroupSettings