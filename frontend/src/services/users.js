import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

const baseurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3003/api" : "https://radiator-backend.herokuapp.com/api"

export const getUser = async (id)  => {
  const request = axios.get(`${baseurl}/users/${id}`)
  return request.then((response) => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const getAllUsers = async ()  => {
  const request = axios.get(`${baseurl}/users/`)
  return request.then((response) => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const deleteUser = async (id)  => {
  const request = axios.delete(`${baseurl}/users/${id}`)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const putUser = async (payload) => {
  const request = axios.put(`${baseurl}/users/`, payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export default { getUser, getAllUsers, deleteUser, putUser }
