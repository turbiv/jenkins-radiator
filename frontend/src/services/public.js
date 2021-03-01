import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getAllPublic = () => {
  const request = axios.get("http://localhost:3003/api/public/radiator", headers)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
};

export const getRadiatorById = (id) =>{
  const request = axios.get("http://localhost:3003/api/public/radiator/" + id, headers)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}


export default { getAllPublic }