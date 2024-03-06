import axios, { type AxiosResponse } from "axios"
import { ElMessage, ElMessageBox } from "element-plus"
import router from "@/router"
import sign from "@/utils/sign"
import storage from "@/utils/storage"
import { TOKEN, USER_INFO, RESPONSE_CODE } from "@/constants"
import { isString } from "@/utils/typeOf"

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
          storage.del(TOKEN)
          storage.del(USER_INFO)
          
          await router.push({ path: "/login" })
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
