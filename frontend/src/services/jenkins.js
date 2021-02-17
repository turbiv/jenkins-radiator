import axios from "axios"

const headers = {
  headers:{
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
    "Authorization": "Basic " + btoa('admin:115d84c6483416753de87a53b903157502') // Local host token
  }
}

export const getBuilds = (jenkinsUrl, buildAmount) => {
  const request = axios.get( `${jenkinsUrl}/api/json?tree=allBuilds[url,result,id]{0,${buildAmount}}`, headers)
  return request.then(response => response.data)
    .catch(error => Promise.reject(error.response.status))
};

export default { getBuilds }