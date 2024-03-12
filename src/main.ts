import { createApp } from "vue"
import { ElementPlus, injectIcons } from "@/config/element"
import router from "@/router"
import pinia from "@/stores"
import App from "./App.vue"
import "@/utils/auth"
import "@/styles/main"
import "tailwindcss/tailwind.css"
import "element-plus/dist/index.css"

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)

injectIcons(app)

app.mount("#app")
