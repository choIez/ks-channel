import axios, { type AxiosResponse } from "axios"
import { ElMessage, ElMessageBox } from "element-plus"
import router from "@/router"
import pinia from "@/stores"
import { useUserInfoStore } from "@/stores/user"
import sign from "@/utils/sign"
import { RESPONSE_CODE } from "@/constants"
import { isString } from "@/utils/typeof"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})

const LOGIN_URL = "/api/common/qd/login"

service.interceptors.request.use(
  (config: any) => {
    if (config.url === LOGIN_URL) return config
    
    config.headers = {
      ...sign(config),
      ...config.headers
    }
    
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  async (response: AxiosResponse<ResponseResult>) => {
    // @ts-ignore 特殊情况
    if (isString(response.data) && response.data.search(/502/) !== -1) {
      ElMessage({
        message: "服务器正在更新，请稍后...",
        type: "warning",
        showClose: true
      })
      
      return response
    }
    
    if (response.data.code !== RESPONSE_CODE.SUCCESS) {
      if (response.data.code === RESPONSE_CODE.INVALID_TOKEN) {
        try {
          await ElMessageBox.confirm("身份验证已过期！您可以取消停留在此页面，或者重新登录", "注意", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          })
        }
        finally {
          // 把 Pinia 和本地的都清掉, 只清本地会导致 Pinia 中还有数据, 无限请求 userInfo
          useUserInfoStore(pinia).userReset()
          
          await router.push({ name: "login" })
        }
      }
      else {
        ElMessage({
          message: response.data.message,
          type: "error",
          showClose: true
        })
      }
    }
    
    return response
  },
  error => Promise.reject(error)
)

export default service
