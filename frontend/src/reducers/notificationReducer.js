import React from "react"
import "../css/notification.css"
const initalState = [];

export const createNotification = (notification, status = "info", timeout = 7) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification,
        status
      }
    });
    setTimeout(()=>{
      dispatch(removeNotification())
    }, timeout * 1000);
  }
};

export const removeNotification = () =>{
  return{
    type: "REMOVE_NOTIFICATION",
  }
};

const reducer = (state = initalState, action) =>{

  switch (action.type) {
    case "SET_NOTIFICATION":
      switch (action.data.status) {
        case "fail":
          return [...state, <div className={"notification-content"} style={{backgroundColor: "crimson"}}>{action.data.notification}</div>];
        case "success":
          return [...state, <div className={"notification-content"} style={{backgroundColor: "lightgreen"}}>{action.data.notification}</div>];
        case "info":
          return [...state, <div className={"notification-content"} style={{backgroundColor: "lightblue"}}>{action.data.notification}</div>];
        default:
      }
    case "REMOVE_NOTIFICATION":
      return state.slice(1);
    default:
  }

  return state
};


export default reducer