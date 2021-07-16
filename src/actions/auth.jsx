import axios from '@/services/axios'

import {
  setCurrentUser,
  unsetCurrentUser
} from '@/actions/my/profile'

export const authSignup = (values) => () => new Promise((resolve, reject) => {
  const formData = new FormData()

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key])
  })

  axios({
    method: 'POST',
    url: `${process.env.API_DOMAIN}/api/auth/signup`,
    data: formData,
    withCredentials: true
  }).then((resp) => {
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })
})

export const authLogin = (values) => (dispatch) => new Promise((resolve, reject) => axios({
  method: 'POST',
  url: `${process.env.API_DOMAIN}/api/auth/login`,
  data: values,
  withCredentials: true
}).then((resp) => {
  dispatch(setCurrentUser(resp.data))
  resolve(resp)
}).catch((err) => {
  reject(err)
}))

export const authLogout = () => (dispatch) => new Promise((resolve, reject) => axios({
  method: 'DELETE',
  url: `${process.env.API_DOMAIN}/api/auth/logout`,
  withCredentials: true
}).then((resp) => {
  dispatch(unsetCurrentUser())
  resolve(resp)
}).catch((err) => {
  reject(err)
}))
