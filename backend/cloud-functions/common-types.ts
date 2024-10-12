// Function Name: common-types

import * as vbot from "valibot"
import type { BaseSchema } from "valibot"


export async function main(ctx: FunctionContext) {
  console.log("do nothing")
  return true
}

/***************** 基础 Schema 用于 valibot *************/
// validate id's min length
export const Sch_Id = vbot.string([vbot.minLength(8)])
export const Sch_Opt_Str = vbot.optional(vbot.string())
export const Sch_Opt_Num = vbot.optional(vbot.number())
export const Sch_Opt_Bool = vbot.optional(vbot.boolean())
export const Sch_Opt_Id = vbot.optional(Sch_Id)

// trim 后有字符串的 string
export const sch_string_length = (minLength: number = 1) => {
  return vbot.string([
    vbot.toTrimmed(), 
    vbot.minLength(minLength)
  ])
}

// trim 后有字符串的 string
export const Sch_String_WithLength = sch_string_length()

// optional array something
export const sch_opt_arr = (
  sch: BaseSchema, 
  pipe?: vbot.Pipe<any>,
) => {
  return vbot.optional(vbot.array(sch, pipe))
}

export const sch_opt_num = (
  min?: number,
  max?: number,
) => {
  let pipe: vbot.Pipe<any> | undefined
  if(min) pipe = [vbot.minValue(min)]
  if(max) {
    const m = vbot.maxValue(max)
    pipe = pipe ? [...pipe, m] : [m]
  }
  return vbot.optional(vbot.number(pipe))
}


// 每个请求里皆应存在的参数字段
export const Sch_X_Liu = vbot.object({
  x_liu_language: sch_string_length(2),
  x_liu_version: sch_string_length(3),     // 比如 "2.0" 最少有三个字符
  x_liu_client: vbot.literal("web"),
  x_liu_ua: sch_string_length(3),
  x_liu_user_id: sch_string_length(16),
})

/*********************** 回调类型 **********************/
export interface LiuRqReturn<T = Record<string, any>> {
  code: string
  errMsg?: string
  showMsg?: string
  data?: T
}

export interface LiuErrReturn {
  code: string
  errMsg?: string
  showMsg?: string
}


/************************** Return Types **************************/
export interface CourseItem {
  id: string
  name: string
  author?: string
}

export interface Res_GetCourses {
  courses: CourseItem[]
}

export interface CourseScoreItem {
  name: string
  totalScore: string
  avgScore: string      // 平均得分
}

export interface EaterData {
  name: string
  diffScore: string    // fixed to 2 decimal places
  courseScores: string[]
}

export interface Res_GetResult {
  activityId: string
  bestEater: EaterData     // 最佳品鉴官
  yourData?: EaterData
  courses: CourseScoreItem[]
}

export interface ChoiceItem {
  courseId: string      // Table_Course._id
  courseName: string    // 菜名
  score: number   // 1~10
}


/***************************** Tables *****************************/
export interface Table_Activity {
  _id: string
  name: string
  courses?: CourseScoreItem[]
}

export interface Table_Course {
  _id: string
  name: string
  no: number       // 排序
  author?: string
}

export interface Table_Vote {
  userName: string
  userId: string
  choices: ChoiceItem[]
  createdStamp: number
}