import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "user-profile",
          name: "user-profile",
          component: () => import("@/views/User/UserProfile/index.vue")
        },
        {
          path: "study-center",
          name: "study-center",
          component: () => import("@/views/User/StudyCenter/index.vue")
        },
        {
          path: "article-detail",
          name: "article-detail",
          component: () => import("@/views/User/ArticleDetails/index.vue")
        }
      ]
    },
    
    // 登录
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/index.vue")
    },
    
    // 菜单
    ...routes,
    
    // NotFound
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound/index.vue")
    }
  ]
})

export default router
