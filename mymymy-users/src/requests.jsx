import axios from 'axios'

// const baseUrl = 'http://localhost:3001/users' //json-server url
const baseUrl = 'http://localhost:3000/users' // postgrest url

export const getUsers = () => {
  console.log('requests/getUsers')
  return axios.get(baseUrl).then((res) => res.data)
}

export const createUser = (user) => {
  console.log('requests/updateUser: ', user)
  return axios.post(baseUrl, user).then((res) => res.data)
}

export const updateUser = (user) => {
  console.log('requests/updateUser: ', user)
  return axios
    .put(`${baseUrl}/${user.id}`, user)
    .then((res) => res.data)
}
