import axios from "axios"

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
}

const baseurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3003/api" : "https://radiator-backend.herokuapp.com/api"

export const postLogin = async (payload)  => {
  const request = axios.post(`${baseurl}/auth/login/`, payload, headers)
  return request.then((response) => response.data)
    .catch(error => null)
}

export const postRegister = async (payload)  => {
  const request = axios.post(`${baseurl}/auth/register/`, payload, headers)
  return request.then((response) => response.data)
    .catch(error => null)
}

export default { postRegister, postLogin}
