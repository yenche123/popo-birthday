import { useGlobalLoading } from "./tools/useGlobalLoading";

export function useApp() {
  
  useGlobalLoading()

  // print version
  const version = LIU_ENV.version
  console.log(`当前版本: ${version}`)
  
}