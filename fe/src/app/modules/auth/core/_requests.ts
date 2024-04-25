import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const AUTH_API_URL = process.env.REACT_APP_API_URL + 'user'

export const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_API_URL}/verify_token`
export const LOGIN_URL = `${AUTH_API_URL}/login`
export const REGISTER_URL = `${AUTH_API_URL}/signup`
export const REQUEST_PASSWORD_URL = `${AUTH_API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  password: string,
) {
  return axios.post(REGISTER_URL, {
    email,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
