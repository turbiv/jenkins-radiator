import React, {useState} from "react"
import {connect} from "react-redux"
import {setUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";
import {setToken} from "../services/radiator";
import {postLogin, postRegister} from "../services/login"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")

  const confirmUserDetails = () => {
    let formattedNotification = true
    if(!username){
      props.createNotification("Username is missing.")
      formattedNotification = false
    }
    if(!password){
      props.createNotification("Password is missing.")
      formattedNotification = false
    }
    if(!confirmPassword && props.register){
      props.createNotification("Confirmed password is missing.")
      formattedNotification = false
    }
    if(!name && props.register){
      props.createNotification("Name is missing.")
      formattedNotification = false
    }

    return formattedNotification
  }

  const handleLogin = async (event) =>{
    event.preventDefault();
    if(!confirmUserDetails()) return
    return
    const loginuser = await postLogin();
    if(loginuser === null){
      props.createNotification("Failed to login");
      return
    }
    window.localStorage.setItem("loggedUser", JSON.stringify(loginuser));
    props.setUser(loginuser);
    setToken(loginuser.token);
  };

  const handleRegister = async (event) =>{
    event.preventDefault();
    if(!confirmUserDetails()) return
    if(password !== confirmPassword){
      console.log("password match error")
      props.createNotification("Passwords do not match, please double check.")
      return
    }
    return
    const loginuser = await postRegister();
    if(loginuser === null){
      props.createNotification("Failed to register");
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
          <label id={"username"}>Username</label><br/>
          <input id={"username"} type={"text"} onChange={(event) => setUsername(event.target.value)} value={username}/><br/>

          <label id={"name"}>First and last name</label><br/>
          <input id={"name"} type={"text"} onChange={(event) => setName(event.target.value)} value={name}/><br/>

          <label id={"password"}>Password</label><br/>
          <input id={"password"} type={"password"} onChange={(event) => setPassword(event.target.value)} value={password}/><br/>

          <label id={"confirmPassword"}>Confirm password</label><br/>
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
        <label id={"username"}>Username</label><br/>
        <input id={"username"} type={"text"} onChange={(event) => setUsername(event.target.value)} value={username}/><br/>

        <label id={"password"}>Password</label><br/>
        <input id={"password"} type={"password"} onChange={(event) => setPassword(event.target.value)} value={password}/><br/>

        <input type={"submit"} value={"Login"}/>
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