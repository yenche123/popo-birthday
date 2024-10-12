import { 
  FunctionContext as _FunctionContext
} from "@lafjs/cloud"
import { ObjectId as _ObjectId } from "mongodb"

declare global {
  type FunctionContext = _FunctionContext

  class ObjectId extends _ObjectId {}
  
  namespace NodeJS {
    interface ProcessEnv {

      /** 由 Laf 所定义的字段 */
      APPID: string

    }
  }
}