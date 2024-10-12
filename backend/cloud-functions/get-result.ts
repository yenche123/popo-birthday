// Function Name: get-result

import cloud from "@lafjs/cloud"
import type { 
  ChoiceScoreItem, 
  CourseScoreItem, 
  EaterData, 
  Res_GetResult, 
  Table_Activity, 
  Table_Vote,
} from "@/common-types"

const db = cloud.database()

export async function main(ctx: FunctionContext) {
  console.log("let's get the result!")
  const res = await toGetResult(ctx)
  return res
}

async function toGetResult(ctx: FunctionContext) {

  // 1. get the activity
  const aCol = db.collection("Activity")
  const res = await aCol.orderBy("createdStamp", "desc").get<Table_Activity>()
  const list = res.data
  if(list.length === 0) {
    return { code: "E4004" }
  }

  // 2. format the result
  const activity = list[0]
  const courses = activity.courses ?? []
  if(courses.length < 1) return { code: "E4004" }
  const result: Res_GetResult = {
    activityId: activity._id,
    bestEater: activity.bestEater,
    courses,
  }

  // 3. return if user id is not provided
  const body = ctx.body ?? {}
  const userId = body.x_liu_user_id
  if(!userId) {
    return { code: "0000", data: result }
  }

  // 4. get the user's data
  const vCol = db.collection("Vote")
  const q4 =  vCol.where({ userId }).orderBy("createdStamp", "desc")
  const res4 = await q4.get<Table_Vote>()
  const votes4 = res4.data
  if(votes4.length < 1) return { code: "0000", data: result }

  // 5. calculate the user's data
  const myVote = votes4[0]
  const yourData = calculateEaterData(myVote, courses)
  result.yourData = yourData

  return { code: "0000", data: result }
}

export function calculateEaterData(
  myVote: Table_Vote,
  courses: CourseScoreItem[],
): EaterData {
  const choices = myVote.choices
  const choiceScores: ChoiceScoreItem[] = []

  let totalDiffScore = 0

  for(let i=0; i<choices.length; i++) {
    const v = choices[i]
    const course = courses.find(c => c.courseId === v.courseId)
    if(!course) continue

    const avgScore = Number(course.avgScore)
    const score = v.score
    const diffScore = Math.abs(score - avgScore)
    totalDiffScore += diffScore

    const obj: ChoiceScoreItem = {
      courseId: course.courseId,
      courseName: course.courseName,
      score: score,
      diffScore: diffScore.toFixed(2),
    }
    choiceScores.push(obj)
  }

  return {
    name: myVote.userName,
    totalDiffScore: totalDiffScore.toFixed(2),
    choiceScores,
  }
}