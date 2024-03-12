import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { staticRoutes, defaultRoutes } from "./routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...defaultRoutes]
})

export const addRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach(route => router.addRoute(route))
}

export const removeRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach(route => router.removeRoute(route.name as string))
}

export default router
