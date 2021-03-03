import React, {useState} from "react"
import {postNewRadiator} from "../services/radiator"
import {createNotification} from "../reducers/notificationReducer"
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"

const AdminRadiatorCreator = (props) => {

  const [radiatorName, setRadiatorName] = useState("")
  const history = useHistory()

  const handleRadiatorNameChange = (event) => {
    setRadiatorName(event.target.value)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      name: radiatorName,
      owner: props.login.id
    }

    await postNewRadiator(generatedPayload)
      .then(() => {
        props.createNotification(`Radiator ${radiatorName} successfully created`, "success")
        history.push("/admin/home")
      })
      .catch(() => props.createNotification("Unable to create radiator", "fail"))

  }

  return(
    <div>
      <h2>Radiator creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Radiator name:</label><br/>
        <input type={"text"} name={"name"} value={radiatorName} onChange={handleRadiatorNameChange}/><br/>
        <input type={"submit"} value={"Submit"}/>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  createNotification
}


const mapStateToProps = (state) =>{
  return{
    login: state.login,
    notification: state.notification
  }
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AdminRadiatorCreator);
export default connectedComponent;