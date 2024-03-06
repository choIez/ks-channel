import { isReference } from "@/utils/typeOf"

const Storage = class {
  get(key: string): string {
    return localStorage.getItem(key) ?? ""
  }
  
  set(key: string, value: any) {
    if (isReference(value)) value = JSON.stringify(value)
    
    localStorage.setItem(key, value)
  }
  
  del(key: string) {
    localStorage.removeItem(key)
  }
}

export const storage = new Storage()

export default storage
