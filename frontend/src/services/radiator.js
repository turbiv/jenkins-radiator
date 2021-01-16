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

export const putGroup = async (categoryJson) => {
  const request = axios.put("http://localhost:3001/groups/" + categoryJson.id, categoryJson, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const getGroupById = async (id) => {
  const request = axios.get("http://localhost:3001/groups/" + id)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const getAllGroups = async () => {
  const request = axios.get("http://localhost:3001/groups/")
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const postNewJob = async (payload)  => {
  const request = axios.post("http://localhost:3003/api/radiator/job/", payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const postNewGroup = async (payload) => {
  const request = axios.post("http://localhost:3003/api/radiator/group/", payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const postNewRadiator = async (payload)  => {
  const request = axios.post("http://localhost:3003/api/radiator/", payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export default { getAll, getRadiatorById, getGroupById, getAllGroups, putGroup, postNewRadiator, postNewGroup, postNewJob }
