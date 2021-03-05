import axios from "axios"

const baseurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3003/api" : "https://radiator-backend.herokuapp.com/api"

export const getAllJenkins = () => {
  const request = axios.get( `${baseurl}/jenkins/`)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
};

export const getJenkinsById = async (id) => {
  const request = axios.get(`${baseurl}/jenkins/${id}`)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
}

export const postNewJenkins = async (payload) => {
  const request = axios.post(`${baseurl}/jenkins/`, payload)
  return request.then(() => Promise.resolve())
    .catch(error => Promise.reject(error.response.status))
}



export default { getAllJenkins, getJenkinsById, postNewJenkins }