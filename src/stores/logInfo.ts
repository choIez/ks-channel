import { ref } from "vue"
import { defineStore } from "pinia"
import { apiLogInfo } from "@/api/user"
import type { LogInfo } from "@/api/user/types"

export const useLogInfoStore = defineStore("logInfo", () => {
  const logInfo = ref<LogInfo[] | null>(null)
  
  const getLogInfo = async () => {
    const response = await apiLogInfo()
    logInfo.value = response.data.data
  }
  
  return { logInfo, getLogInfo }
})
