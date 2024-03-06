import request from "@/utils/request"
import { MD5 } from "crypto-js"
import type {
  LoginParams,
  LoginResult,
  UserInfo,
  UpdateUserInfoParams,
  UpdatePasswordParams,
  LogInfo
} from "./types"

const BASE_URL = "/api/qd/user"
const LOGIN_URL = "/api/common/qd/login"
const USER_INFO_URL = `${ BASE_URL }/info`
const UPDATE_USER_INFO_URL = `${ BASE_URL }/update`
const UPDATE_PASSWORD_URL = `${ BASE_URL }/change_password`
const LOGOUT_URL = `${ BASE_URL }/logout`
const LOG_INFO_URL = `${ BASE_URL }/log`

/**
 * 登录
 * @param {string} data.username
 * @param {string} data.password
 */
export const apiLogin = (data: LoginParams) => {
  const username = MD5(data.username).toString()
  const password = MD5(username + data.password).toString()
  
  const MD5_DATA = { username, password }
  
  return request.post<ResponseResult<LoginResult>>(LOGIN_URL, MD5_DATA)
}

/**
 * 获取用户信息
 */
export const apiUserInfo = () => {
  return request.get<ResponseResult<UserInfo>>(USER_INFO_URL)
}

/**
 * 修改用户信息
 * @param {string} data.nickname
 * @param {string} data.email
 * @param {string} data.avatar
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.work_wx_qrcode
 */
export const apiUpdateUserInfo = (data: UpdateUserInfoParams) => {
  return request.post<ResponseResult<UserInfo>>(UPDATE_USER_INFO_URL, data)
}

/**
 * 修改密码
 * @param {string} data.username
 * @param {string} data.oldPassword
 * @param {string} data.newPassword
 * @param {string} data.confirmPassword
 */
export const apiUpdatePassword = (data: UpdatePasswordParams) => {
  const username = data.username
  const old_password = MD5(username + data.oldPassword).toString()
  const new_password = MD5(username + data.newPassword).toString()
  const verify_password = MD5(username + data.confirmPassword).toString()
  
  const MD5_DATA = { old_password, new_password, verify_password }
  
  return request.post<ResponseResult<null>>(UPDATE_PASSWORD_URL, MD5_DATA)
}

/**
 * 退出登录
 */
export const apiLogout = () => {
  return request.get<ResponseResult<null>>(LOGOUT_URL)
}

/**
 * 登录日志
 */
export const apiLogInfo = () => {
  return request.get<ResponseResult<LogInfo[]>>(LOG_INFO_URL)
}
