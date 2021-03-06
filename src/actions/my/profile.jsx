import axios from '@/services/axios'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUser = (payload) => ({ type: SET_CURRENT_USER, payload })

export const UNSET_CURRENT_USER = 'UNSET_CURRENT_USER'
export const unsetCurrentUser = () => ({ type: UNSET_CURRENT_USER })

export const getMyProfile = (config = {}) => (dispatch) => new Promise((resolve, reject) => {
  axios({
    method: 'GET',
    url: `${process.env.API_DOMAIN}/api/my/profile`,
    withCredentials: true,
    hide401Error: config.hide401Error
  }).then((resp) => {
    dispatch(setCurrentUser(resp.data))
    resolve()
  }).catch(() => {
    dispatch(setCurrentUser({ user: null }))
    reject()
  })
})

export const updateMyProfile = (values) => (dispatch) => new Promise((resolve, reject) => {
  axios({
    method: 'PUT',
    url: `${process.env.API_DOMAIN}/api/my/profile`,
    data: values,
    withCredentials: true
  }).then((resp) => {
    dispatch(setCurrentUser(resp.data))
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })
})

export const updatePassword = (values) => (dispatch) => new Promise((resolve, reject) => {
  axios({
    method: 'PUT',
    url: `${process.env.API_DOMAIN}/api/my/profile/password`,
    data: values,
    withCredentials: true
  }).then((resp) => {
    dispatch(setCurrentUser(resp.data))
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })
})
