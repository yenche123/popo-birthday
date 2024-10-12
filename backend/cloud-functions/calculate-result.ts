// Function Name: calculate-result

import cloud from "@lafjs/cloud"
import type { 
  CourseScoreItem, 
  EaterData, 
  Partial_Id, 
  Table_Activity, 
  Table_Course, 
  Table_Vote,
} from "@/common-types"
import { calculateEaterData } from "@/get-result"

const db = cloud.database()

export async function main(ctx: FunctionContext) {
  console.log("do nothing")
  const res = await toCalculateResult()
  return res
}

interface TmpItem {
  courseId: string
  courseName: string
  totalScore: number
}

async function toCalculateResult() {

  // 1. get all courses
  const cCol = db.collection("Course")
  const res1 = await cCol.get<Table_Course>()
  const courses = res1.data
  if(courses.length < 1) {
    return { code: "0000" }
  }

  // 2. get all votes
  const vCol = db.collection("Vote")
  const res2 = await vCol.get<Table_Vote>()
  const votes = res2.data
  if(votes.length < 1) {
    return { code: "0000" }
  }

  // 3. calculate the score of each course
  const tmpItems: TmpItem[] = courses.map(v => {
    return {
      courseId: v._id,
      courseName: v.name,
      totalScore: 0,
    }
  })
  
  const pplNum = votes.length
  for(let i=0; i<pplNum; i++) {
    const v = votes[i]
    addVoteIntoScoreItems(v, tmpItems)
  }

  // 4. convert tmpItems to CourseScoreItem
  const courseScoreItems: CourseScoreItem[] = tmpItems.map(v => {
    return {
      courseId: v.courseId,
      courseName: v.courseName,
      totalScore: v.totalScore.toString(),
      avgScore: (v.totalScore / pplNum).toFixed(2),
    }
  })

  // 5. calculate best choice
  const eaterDatas: EaterData[] = []
  for(let i=0; i<votes.length; i++) {
    const v = votes[i]
    const aEaterData = calculateEaterData(v, courseScoreItems)
    eaterDatas.push(aEaterData)
  }

  // 6. sort eaterDatas
  const _sort = (a: EaterData, b: EaterData) => {
    const aDiff = Number(a.totalDiffScore)
    const bDiff = Number(b.totalDiffScore)
    return aDiff - bDiff
  }
  eaterDatas.sort(_sort)

  const bestEater = eaterDatas[0]
  
  // 7. save the result
  const newActivity: Partial_Id<Table_Activity> = {
    createdStamp: Date.now(),
    bestEater,
    courses: courseScoreItems,
  }
  console.log("newActivity: ")
  console.log(newActivity)
  
  const aCol = db.collection("Activity")
  const res7 = await aCol.add(newActivity)
  
  return { code: "0000" }
}


function addVoteIntoScoreItems(
  vote: Table_Vote,
  tmpItems: TmpItem[],
) {
  const choices = vote.choices
  for(let i=0; i<choices.length; i++) {
    const v = choices[i]
    const theItem = tmpItems.find(item => item.courseId === v.courseId)
    if(!theItem) continue
    theItem.totalScore += v.score
  }
}
