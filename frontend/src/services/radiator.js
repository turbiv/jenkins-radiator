import data from "../test_data/radiators.json"
import singleRad from "../test_data/single_radiator.json"
import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getAll = () => {
  return data
};

export const getRadiatorById = (id) =>{
  const request = axios.get("http://localhost:3001/singleRad/" + id)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const putRadiator = async (radiatorJson) => {
  const request = axios.put("http://localhost:3001/singleRad/" + radiatorJson.id, radiatorJson, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const getCategoryById = async (id) => {
  const request = axios.get("http://localhost:3001/categories/" + id)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export default { getAll, getRadiatorById, getCategoryById }
