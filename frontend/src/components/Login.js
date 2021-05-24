import React, {useState} from "react"
import {connect} from "react-redux"
import {setUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";
import {setToken} from "../services/radiator";
import {postLogin, postRegister} from "../services/login"
import { useTranslation, Trans } from 'react-i18next';

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const { t, i18n } = useTranslation();

  const confirmUserDetails = () => {
    let formattedNotification = true
    if(!username){
      props.createNotification(t("missingUsernameError"), "fail")
      formattedNotification = false
    }
    if(!password){
      props.createNotification(t("missingPasswordError"), "fail")
      formattedNotification = false
    }
    if(!confirmPassword && props.register){
      props.createNotification(t("confirmedPassworddError"), "fail")
      formattedNotification = false
    }
    if(!name && props.register){
      props.createNotification(t("missingNameError"), "fail")
      formattedNotification = false
    }

    return formattedNotification
  }

  const handleLogin = async (event) =>{
    event.preventDefault();
    if(!confirmUserDetails()) return
    const loginuser = await postLogin({username, password});

    if(!loginuser){
      props.createNotification(t("loginFailError"), "fail");
      return
    }
    console.log(loginuser)
    window.localStorage.setItem("loggedUser", JSON.stringify(loginuser));
    props.setUser(loginuser);
    setToken(loginuser.token);
  };

  const handleRegister = async (event) =>{
    event.preventDefault();
    console.log("submit")
    if(!confirmUserDetails()) return
    if(password !== confirmPassword){
      props.createNotification(t("passwordMatchError"), "fail")
      return
    }
    const loginuser = await postRegister({username, password, name});
    if(!loginuser){
      props.createNotification(t("failedToReigster"), "fail");
      return
    }
    window.localStorage.setItem("loggedUser", JSON.stringify(loginuser));
    props.setUser(loginuser);
    setToken(loginuser.token);
  };

  if(props.register){
    return(
      <div>
        <form onSubmit={handleRegister}>
          <p>Register</p>
          <label id={"username"}>{t("username")}</label><br/>
          <input id={"username"} type={"text"} onChange={(event) => setUsername(event.target.value)} value={username}/><br/>

          <label id={"name"}>{t("firstAndLastName")}</label><br/>
          <input id={"name"} type={"text"} onChange={(event) => setName(event.target.value)} value={name}/><br/>

          <label id={"password"}>{t("password")}</label><br/>
          <input id={"password"} type={"password"} onChange={(event) => setPassword(event.target.value)} value={password}/><br/>

          <label id={"confirmPassword"}>{t("confirmPassword")}</label><br/>
          <input id={"confirmPassword"} type={"password"} onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword}/><br/>

          <input type={"submit"} value={"Submit"}/>
        </form>
      </div>
    )
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <p>Login</p>
        <label id={"username"}>{t("username")}</label><br/>
        <input id={"username"} type={"text"} onChange={(event) => setUsername(event.target.value)} value={username}/><br/>

        <label id={"password"}>{t("password")}</label><br/>
        <input id={"password"} type={"password"} onChange={(event) => setPassword(event.target.value)} value={password}/><br/>

        <input type={"submit"} value={t("login")}/>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setUser,
  createNotification
};

const mapStateToProps = (state) =>{
  return{
    login: state.login,
    notification: state.notification
  }
};

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);
export default connectedLoginForm