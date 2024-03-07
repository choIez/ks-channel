import { storeToRefs } from "pinia"
import { ElMessage } from "element-plus"
import router from "@/router"
import pinia from "@/stores"
import { useUserInfoStore } from "@/stores/user"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const userInfoStore = useUserInfoStore(pinia)
const { userToken, userInfo } = storeToRefs(userInfoStore)
const { getUserInfo, userReset } = userInfoStore

export const whiteRoutes = ["login"]
export const groupRoutes = ["invite-user", "team-product", "team-master"]

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  
  // 有 Token
  if (userToken.value) {
    if (to.name === "login") {
      next({ path: "/" })
      
      NProgress.done()
    }
    else {
      // 用户信息有效
      if (userInfo.value?.username) {
        // 组长才能进的路由
        if (groupRoutes.includes(to.name as string) && userInfo.value.is_has_child !== 1) {
          // TODO 换成两套路由表 通过路由控制权限
          ElMessage({
            message: "无权限访问",
            type: "error",
            showClose: true
          })
          
          next({ path: "/no-permission" })
        }
        // 通用路由
        else {
          next()
        }
      }
      // 无用户信息
      else {
        try {
          await getUserInfo()
          
          // 重新进入当前路由(重新鉴权)
          next({ ...to })
        }
        catch {
          // 请求用户信息失败, 清空所有用户信息
          userReset()
          
          next(`/login?redirect=${ to.path }`)
          
          NProgress.done()
        }
      }
    }
  }
  // 无 Token
  else {
    if (whiteRoutes.includes(to.name as string)) {
      next()
    }
    else {
      next(`/login?redirect=${ to.path }`)
      
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
