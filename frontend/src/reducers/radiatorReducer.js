import radiatorService from "../services/radiator"

export const initializeRadiators = () =>{
  return async dispatch =>{
    const content = await radiatorService.getAll();
    dispatch({
      type: "INIT",
      data: content
    })
  }
};

const reducer = (state = [], action) =>{
  console.log("action test_data: " , action.data);
  console.log("action type:" , action.type);
  console.log("state test_data before: ", state);

  switch (action.type) {
    case "INIT":
      return action.data;
    default:
  }

  console.log("default state: ", state);
  return state
};

export default reducer