import React, {useState} from "react"
import {postNewGroup} from "../services/radiator"
import {createNotification} from "../reducers/notificationReducer"
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"
import {useTranslation} from "react-i18next"

const AdminGroupCreator = (props) => {

  const [groupTitle, setGroupTitle] = useState("")
  const history = useHistory()
  const { t, i18n } = useTranslation();

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
      .then(() => {
        props.createNotification(t("groupCreation", {group_title: groupTitle}), "success")
        history.push("/admin/groups")
      })
      .catch(() => props.createNotification(t("groupCreationFail"), "fail"))
  }

  return(
    <div>
      <h2>{t("groupCreationTitle")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("groupNameLabel")}</label><br/>
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