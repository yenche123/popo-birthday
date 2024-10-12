import { onActivated, reactive } from "vue";
import type { RpData } from "./types";
import { fetchResult } from "~/pages/utils/requests";
import { Res_GetResult } from "~/types";

export function useResultPage() {
  const rpData = reactive<RpData>({})

  onActivated(() => {
    getResult(rpData)
  })

  return {
    rpData,
  }
}

async function getResult(
  rpData: RpData,
) {
  const res = await fetchResult()
  if(res.code === "0000") {
    rpData.rs = res.data
    calculateBestCourse(rpData, res.data)
  }
}

function calculateBestCourse(
  rpData: RpData,
  rs?: Res_GetResult,
) {
  if(!rs) {
    delete rpData.bestCourseId
    return
  }

  let bestTotalScore = 0
  let bestCourseId: string | undefined
  const list = rs.courses
  list.forEach(v => {
    const totalScore = Number(v.totalScore)
    if(totalScore > bestTotalScore) {
      bestTotalScore = totalScore
      bestCourseId = v.courseId
    }
  })

  rpData.bestCourseId = bestCourseId
}