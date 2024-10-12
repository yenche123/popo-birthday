


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

export interface Param_AddVote {
  userName: string
  choices: ChoiceItem[]
}


/*********  requests  ***********/
export interface LiuRqOpt {
  method?: "POST" | "GET"
  signal?: AbortSignal       // 信号对象，用于中止 fetch() 请求
  timeout?: number           // 超时的毫秒数，默认为 10000; 当 signal 属性存在时，此值无意义
}

export interface LiuRqReturn<T> {
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

