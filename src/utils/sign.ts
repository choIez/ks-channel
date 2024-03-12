import { MD5 } from "crypto-js"
import { storage } from "@/utils/storage"
import { STORAGE_KEY } from "@/constants"
import { isUndefined, isArray, isFunction, isFormDate } from "@/utils/typeof"

interface Options {
  baseURL?: string
  url?: string
  params?: any
  method?: string
  data?: any
}

const formatParams = (params: Record<string, any>) => {
  const result: string[] = []
  
  const realParams = Object.entries(params).reduce((prev: Record<string, any>, item: [string, any]) => {
    const key = item[0]
    const val = item[1]
    
    if (!isUndefined(val) || !isFunction(val)) prev[key] = val
    
    return prev
  }, {})
  
  const realKeys: string[] = Object.keys(realParams).sort()
  
  const hasParams = realKeys && realKeys.length
  
  for (const key of realKeys) {
    const value = params[key]
    
    if (value === null) continue
    
    let elements: string
    
    if (isArray(value)) {
      if (!(value && value.length)) continue
      
      elements = value.map((_item: any, index: number) => `${ fixedEncodeURIComponent(`${ key }[${ index }`) }=${ fixedEncodeURIComponent(value) }`).join("&")
    }
    else {
      elements = `${ fixedEncodeURIComponent(key) }=${ fixedEncodeURIComponent(value) }`
    }
    
    result.push(elements)
  }
  
  return hasParams ? "?" + result.join("&") : ""
}

export const sign = (options?: Options) => {
  const { baseURL = "", url = "", params = {}, method, data = null } = options ?? {}
  
  const Ds_Token = storage.get(STORAGE_KEY.TOKEN)
  
  const _userInfo = storage.get(STORAGE_KEY.USER_INFO)
  const userInfo = _userInfo ? JSON.parse(_userInfo) : ""
  const Ds_User_Id = _userInfo ? userInfo.id : ""
  
  const Ds_Time = new Date().getTime().toString().substring(0, 10)
  
  const isGet = method?.toUpperCase() === "GET"
  
  const isJson = !isFormDate(data)
  
  const searchParams = formatParams(params)
  
  const uri = baseURL + url + searchParams
  
  let Ds_Sign
  
  if (isGet) {
    Ds_Sign = Ds_User_Id + Ds_Time + Ds_Time + uri
  }
  else if (isJson) {
    const content = data ? JSON.stringify(data) : ""
    Ds_Sign = Ds_User_Id + Ds_Time + content + Ds_Time + uri
  }
  else {
    Ds_Sign = Ds_User_Id + Ds_Time + Ds_Time + uri
  }
  
  Ds_Sign = MD5(Ds_Sign).toString()
  
  return {
    "Ds-Token": Ds_Token,
    "Ds-User-Id": Ds_User_Id,
    "Ds-Sign": Ds_Sign,
    "Ds-Time": Ds_Time
  }
}

export const fixedEncodeURIComponent = (str: any) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

export default sign
