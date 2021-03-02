import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

const baseurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3003/api" : "https://radiator-backend.herokuapp.com/api"

export const getAllPublic = () => {
  const request = axios.get(`${baseurl}/public/radiator`, headers)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
};

export const getRadiatorById = (id) =>{
  const request = axios.get(`${baseurl}/public/radiator/${id}`, headers)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}


export default { getAllPublic }