import data from "../test_data/radiators.json"
import singleRad from "../test_data/single_radiator.json"
import axios from "axios"

export const getAll = () => {
  return data
};

export const getRadiatorById =  () =>{
  const request = axios.get("http://localhost:3001/categories/1")
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const postRadiator = async (radiatorJson) => {
  await axios.post("http://localhost:3001/categories/1", singleRad.categories)
  return true
}

export default { getAll, getRadiatorById }
