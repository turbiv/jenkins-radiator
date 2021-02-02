import {setToken} from "../services/radiator";

export const setUser = (user) =>{
  return async dispatch =>{
    setToken(user.token);
    dispatch({
      type: "SET_USER",
      data: user
    })
  }
};

export const removeUser = () =>{
  return async dispatch =>{
    setToken("");
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "REMOVE_USER",
      data: ""
    })
  }
};

const reducer = (state = null, action) =>{
  console.log("action test_data: " , action.data);
  console.log("action type:" , action.type);
  console.log("state test_data before: ", state);

  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "REMOVE_USER":
      return null;
    default:
  }

  return state
};

export default reducer