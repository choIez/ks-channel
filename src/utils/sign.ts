import { MD5 } from "crypto-js"
import { storage } from "@/utils/storage"
import { TOKEN, USER_INFO } from "@/constants"
import { isUndefined, isArray, isFunction, isFormDate } from "@/utils/typeOf"

interface Options {
  baseURL?: string
  url?: string
  params?: any
  method?: string
  data?: any
}

const paramsSerializer = (params: Record<string, any>) => {
  const result: string[] = []
  
  const _params = Object.entries(params).reduce((prev: Record<string, any>, item: [string, any]) => {
    const key = item[0]
    const val = item[1]
    
    if (!isUndefined(val) || !isFunction(val)) prev[key] = val
    
    return prev
  }, {})
  
  const _paramsKey: string[] = Object.keys(_params).sort()
  
  const hasParams = _paramsKey && _paramsKey.length
  
  for (const key of _paramsKey) {
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
  
  const Ds_Token = storage.get(TOKEN)
  
  const userInfo = JSON.parse(storage.get(USER_INFO))
  const Ds_User_Id = userInfo.id
  
  const Ds_Time = new Date().getTime().toString().substring(0, 10)
  
  const isGet = method?.toUpperCase() === "GET"
  
  const isJson = !isFormDate(data)
  
  const searchParams = paramsSerializer(params)
  
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
