import React from "react"
import {connect} from "react-redux"
import {setUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";
import {setToken} from "../services/radiator";
import {postLogin} from "../services/login"

const Login = (props) => {

  const handleLogin = async (event) =>{
    event.preventDefault();
    const loginuser = await postLogin();
    if(loginuser === null){
      props.createNotification("Failed to login");
      return
    }
    window.localStorage.setItem("loggedUser", JSON.stringify(loginuser));
    props.setUser(loginuser);
    setToken(loginuser.token);
  };

  return(
    <div>
      <form>
        <button onSubmit={handleLogin}/>
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