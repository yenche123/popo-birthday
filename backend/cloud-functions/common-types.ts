
export async function main(ctx: FunctionContext) {
  console.log("do nothing")
  return true
}



export interface CourseScoreItem {
  name: string
  totalScore: string
  avgScore: string      // 平均得分
}

export interface VoteItem {
  _id: string     // Table_Course._id
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
  votes: VoteItem[]
  createdStamp: number
}