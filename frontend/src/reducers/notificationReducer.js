import React from "react"
const initalState = [];

export const createNotification = (notification, timeout = 7) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification
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
      return [...state, <div>{action.data.notification}</div>];
    case "REMOVE_NOTIFICATION":
      return state.slice(1);
    default:

  }
  return state
};


export default reducer