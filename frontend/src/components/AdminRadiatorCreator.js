import React, {useState} from "react"
import {postNewRadiator} from "../services/radiator"
import {createNotification} from "../reducers/notificationReducer"
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"
import {useTranslation} from "react-i18next"

const AdminRadiatorCreator = (props) => {

  const [radiatorName, setRadiatorName] = useState("")
  const history = useHistory()
  const { t, i18n } = useTranslation();

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
        props.createNotification(t("radiatorCreated", {radiator_name: radiatorName}), "success")
        history.push("/admin/home")
      })
      .catch(() => props.createNotification(t("radiatorCreationFailed"), "fail"))

  }

  return(
    <div>
      <h2>{t("radiatorCreationPage")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("radiatorName")}</label><br/>
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