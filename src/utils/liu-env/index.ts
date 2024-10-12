import { type LiuSystemEnv } from "./types"

let _env: LiuSystemEnv | undefined

function getEnv(): LiuSystemEnv {
  if(_env) return _env

  const DEV = import.meta.env.DEV
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

  _env =  {
    DEV,
    API_DOMAIN,
  }

  return _env
}

export default {
  getEnv,
}