import { ref } from "vue"
import { defineStore } from "pinia"
import { ElMessage } from "element-plus"
import { apiLogin, apiUserInfo, apiUpdateUserInfo, apiLogout } from "@/api/user"
import type { LoginParams, UserInfo, UpdateUserInfoParams } from "@/api/user/types"
import storage from "@/utils/storage"
import { TOKEN, USER_INFO, RESPONSE_CODE } from "@/constants"

export const useUserInfoStore = defineStore("userInfo", () => {
  // TOKEN
  const userToken = ref<string>(storage.get(TOKEN))
  
  // POSITION_TYPE  抖音: 1, 快手: 2
  const userType = ref<number>(0)
  
  // 用户信息
  const userInfo = ref<UserInfo | null>(null)
  
  // 登录
  const userLogin = async (data: LoginParams) => {
    const response = await apiLogin(data)
    
    if (response.data.code === RESPONSE_CODE.LOGIN_ERROR) {
      userReset()
    }
    else {
      userToken.value = response.data.data.token
      userType.value = response.data.data.position_type
      
      storage.set(TOKEN, userToken.value)
      storage.set(USER_INFO, response.data.data)
    }
  }
  
  // 获取用户信息
  const getUserInfo = async () => {
    const response = await apiUserInfo()
    userInfo.value = response.data.data
    
    const favicon: HTMLLinkElement = document.querySelector("#favicon")!
    const { icon } = userInfo.value?.company
    
    if (favicon && icon) favicon.href = icon
    
    storage.set(USER_INFO, userInfo.value)
  }
  
  // 更新用户信息
  const updateUserInfo = async (data: UpdateUserInfoParams) => {
    const response = await apiUpdateUserInfo(data)
    userInfo.value = response.data.data
    
    storage.set(USER_INFO, userInfo.value)
    
    ElMessage({
      message: "修改成功",
      type: "success",
      showClose: true
    })
  }
  
  // 登出
  const userLogout = async () => {
    await apiLogout()
    
    userReset()
  }
  
  // 清空
  const userReset = () => {
    userToken.value = ""
    userType.value = 0
    userInfo.value = null
    
    storage.del(TOKEN)
    storage.del(USER_INFO)
  }
  
  return { userToken, userType, userInfo, userLogin, getUserInfo, updateUserInfo, userLogout, userReset }
})
