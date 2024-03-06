/// <reference types="vite/client" />
declare interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly DEV: boolean
  readonly MODE: string
  readonly PROD: boolean
  readonly SSR: boolean
  readonly VITE_BASE_URL: string
  readonly VITE_IMAGE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
