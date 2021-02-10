import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getUser = async (id)  => {
  const request = axios.get("http://localhost:3003/api/users/" + id)
  return request.then((response) => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const getAllUsers = async ()  => {
  const request = axios.get("http://localhost:3003/api/users/")
  return request.then((response) => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const deleteUser = async (id)  => {
  const request = axios.delete("http://localhost:3003/api/users/" + id)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export default { getUser, getAllUsers, deleteUser }
