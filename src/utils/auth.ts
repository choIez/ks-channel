import { storeToRefs } from "pinia"
import router from "@/router"
import pinia from "@/stores"
import { addRoutes } from "@/router"
import { leaderRoutes, memberRoutes, errorRoutes } from "@/router/routes"
import { useUserInfoStore } from "@/stores/user"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const userInfoStore = useUserInfoStore(pinia)
const { userToken, userInfo, userRoutes } = storeToRefs(userInfoStore)
const { getUserInfo, userReset } = userInfoStore

const whiteRoutes = ["login"]

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  
  // 有 Token
  if (userToken.value) {
    if (whiteRoutes.includes(<string>to.name)) {
      next({ path: "/" })
      
      NProgress.done()
    }
    else {
      // 用户信息有效
      if (userInfo.value?.username) {
        if (router.getRoutes().find(route => route.name === "team")) {
          next()
        }
        else {
          userRoutes.value = userInfo.value.is_has_child ? [...leaderRoutes] : [...memberRoutes]
          
          addRoutes([...userRoutes.value, ...errorRoutes])
          
          // addRoute 是异步的, 此时 next() 依然匹配不到路由, 需要重新进入当前路由
          next({ ...to, replace: true })
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
    if (whiteRoutes.includes(<string>to.name)) {
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
