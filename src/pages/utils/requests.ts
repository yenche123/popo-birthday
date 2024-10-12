import APIs from "~/requests/APIs";
import liuReq from "~/requests/liu-req";
import { Res_GetCourses } from "~/types";



export async function fetchCourses() {
  const url = APIs.GET_COURSES
  const res = await liuReq.request<Res_GetCourses>(url)


  console.log("看一下 fetchCourses: ")
  console.log(res)


  return res
}