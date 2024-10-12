import valTool from "~/utils/basic/val-tool";
import type { LiuRqOpt, LiuRqReturn } from "~/types";
import typeCheck from "~/utils/basic/type-check";
import liuApi from "~/utils/liu-api";
import ider from "~/utils/basic/ider";

function _getBody<U extends Record<string, any>>(
  body?: U,
) {
  let userId = liuApi.getStorageSync<string>("user_id")
  if(!userId) {
    userId = ider.createUserId()
    liuApi.setStorageSync("user_id", userId)
  }

  const userAgent = navigator.userAgent
  const b: Record<string, any> = {
    x_liu_language: navigator.language,
    x_liu_version: LIU_ENV.version,
    x_liu_client: LIU_ENV.client,
    x_liu_ua: userAgent,
    x_liu_user_id: userId,
    ...body,
  }
  const b2 = valTool.objToStr(b)
  return b2
}

async function request<
  T extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(
  url: string,
  body?: U,
  opt?: LiuRqOpt,
): Promise<LiuRqReturn<T>> {
  const bodyStr = _getBody(body)
  let init: RequestInit = {
    method: opt?.method ?? "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: bodyStr,
  }

  let res: Response
  try {
    res = await fetch(url, init)
  }
  catch(err: any) {
    // console.warn("fetch err...........")
    // console.log(err)
    // console.log(" ")

    const errMsg: unknown = err.toString?.()
    const errName = err.name
    let errMsg2 = ""  // 转成小写的 errMsg

    if(typeCheck.isString(errMsg)) {
      errMsg2 = errMsg.toLowerCase()
    }

    if(errName === "TimeoutError") {
      return { code: "F0002" }
    }
    if(errName === "AbortError") {
      return { code: "F0003" }
    }
    if(errName === "TypeError") {

      // 当后端整个 Shut Down 时，可能抛出这个错误
      // 欠费时，也可能抛出这个错误
      if(errMsg2.includes("failed to fetch")) {
        return { code: "B0001" }
      }
      
    }

    return { code: "C0001" }
  }

  if(!res) {
    console.warn("liu-req fail: ")
    console.log(res)
    console.log(" ")
    return { code: "C0001" }
  }

  const status = res.status

  // Laf 底层异常
  if(status === 500) {
    return { code: "B0500" }
  }
  // 其他错误皆视为后端在维护中
  if(status > 500 && status < 600) {
    return { code: `B0001` }
  }

  let res2 = await res.json() as LiuRqReturn<T>
  return res2
}

export default {
  request,
}