import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const postLogin = async (payload)  => {
  const request = axios.post("http://localhost:3003/api/auth/login/", payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export const postRegister = async (payload)  => {
  const request = axios.post("http://localhost:3003/api/auth/register/", payload, headers)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}

export default { postRegister, postLogin }
