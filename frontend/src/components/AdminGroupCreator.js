import React, {useState} from "react"
import {postNewGroup} from "../services/radiator"
import {createNotification} from "../reducers/notificationReducer"
import {connect} from "react-redux"

const AdminGroupCreator = (props) => {

  const [groupTitle, setGroupTitle] = useState("")

  const handleGroupTitleChange = (event) => {
    setGroupTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const generatedPayload = {
      title: groupTitle,
      owner: props.login.id
    }

    await postNewGroup(generatedPayload)

  }

  return(
    <div>
      <h2>Group creation page</h2>
      <form onSubmit={handleSubmit}>
        <label>Group name:</label><br/>
        <input type={"text"} name={"title"} value={groupTitle} onChange={handleGroupTitleChange}/><br/>
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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AdminGroupCreator);
export default connectedComponent;