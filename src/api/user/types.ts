// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录信息
export interface LoginResult {
  token: string
  position_type: number // 抖音: 1, 快手: 2
  
  [prop: string]: any
}

// 用户信息
export interface UserInfo {
  account_type: number
  avatar: string
  company: {
    auth_type: number
    icon: string
    id: number
    logo: string
    name: string
  }
  company_id: number
  created_at: string
  created_ymd: number
  depart_id: number
  dimission_status: number
  email: string
  gender: number
  group_id: number
  hash_key: string
  id: number
  invite_id: number
  is_delete: number
  is_has_child: number
  login_at: string
  login_ip: string
  login_num: number
  login_region: string
  logout_at: string
  name: string
  nickname: string
  phone: string
  position_type: number
  remark: string
  resigned_at: null
  sort: number
  status: number
  updated_at: string
  username: string
  work_wx_qrcode: string
}

// 修改用户信息参数
export interface UpdateUserInfoParams {
  nickname: string
  email: string
  avatar: string
  name: string
  phone: string
  work_wx_qrcode: string
}

// 修改密码参数
export interface UpdatePasswordParams {
  username: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

// 登录日志
export interface LogInfo {
  content: string
  created_at: string
  ip: string
  result: string
}
