import APIs from "~/requests/APIs";
import liuReq from "~/requests/liu-req";
import type { Res_GetCourses, Res_GetResult } from "~/types";
import time from "~/utils/basic/time"


const SEC_10 = 10 * 1000
const SEC_30 = SEC_10 * 3

let data1: Res_GetCourses | undefined
let stamp1 = 0
export async function fetchCourses() {
  if(data1 && time.isWithinMillis(stamp1, SEC_30)) {
    return { code: "0000", data: data1 }
  }

  const url = APIs.GET_COURSES
  const res = await liuReq.request<Res_GetCourses>(url)
  if(res.code === "0000" && res.data) {
    data1 = res.data
    stamp1 = Date.now()
  }

  return res
}

let data2: Res_GetResult | undefined
let stamp2 = 0
export async function fetchResult() {
  if(data2 && time.isWithinMillis(stamp2, SEC_10)) {
    return { code: "0000", data: data2 }
  }

  const url = APIs.GET_RESULT
  const res = await liuReq.request<Res_GetResult>(url)
  if(res.code === "0000" && res.data) {
    data2 = res.data
    stamp2 = Date.now()
  }
  
  return res
}