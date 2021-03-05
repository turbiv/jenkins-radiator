import axios from "axios"

const baseurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3003/api" : "https://radiator-backend.herokuapp.com/api"

const jenkinsHeaders = (host, port, path, token) => {
  return {
    mode: 'no-cors',
    headers:{
      "Jenkins-Host": host,
      "Jenkins-Path": path,
      "Jenkins-Port": port,
      "Jenkins-Authorization": "Bearer " + btoa(token)
    }
  }
}

export const getBuilds = (jenkinsHost, jenkinsPort, jenkinsPath, token) => {
  const request = axios.get( `${baseurl}/proxy/`, jenkinsHeaders(jenkinsHost, jenkinsPort, jenkinsPath, token))
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
};