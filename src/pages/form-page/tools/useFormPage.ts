import { reactive } from "vue";
import { MyChoiceItem, type FpData } from "./types";
import { fetchCourses } from "~/pages/utils/requests";
import type { ChoiceItem, Param_AddVote, CourseItem } from "~/types";
import cui from "~/components/custom-ui";
import liuApi from "~/utils/liu-api";
import valTool from "~/utils/basic/val-tool";
import APIs from "~/requests/APIs";
import liuReq from "~/requests/liu-req";
import { useRouteAndRouter, type RouteAndRouter } from "~/routes/liu-router";

export function useFormPage() {
  const rr = useRouteAndRouter()
  const fpData = reactive<FpData>({
    myChoices: [],
  })

  getCourses(fpData)

  const onTapSubmit = async () => {
    const emptyData = fpData.myChoices.find(item => !Boolean(item.score))
    if(emptyData) {
      cui.showModal({ 
        title: "🔍", 
        content: `你没有给 ${emptyData.courseName} 评分哦`, 
        isTitleEqualToEmoji: true,
        showCancel: false,
      })
      return
    }

    const res = await cui.showModal({
      title: "🍴",
      content: "确定提交吗？不能反悔哦！",
      isTitleEqualToEmoji: true,
    })
    if(!res.confirm) return
    toSubmit(fpData, rr)
  }
  
  return {
    fpData,
    onTapSubmit,
  }
}



async function toSubmit(
  fpData: FpData,
  rr: RouteAndRouter,
) {
  // 1. get choices
  const myChoices = fpData.myChoices
  const choices: ChoiceItem[] = []

  for(let i=0; i<myChoices.length; i++) {
    const v = myChoices[i]
    const aChoice: ChoiceItem = {
      courseId: v.courseId,
      courseName: v.courseName,
      score: v.score as number,
    }
    choices.push(aChoice)
  }

  // 2. get userName
  let userName = liuApi.getStorageSync<string>("name")
  if(!userName) {
    const res = await cui.showTextEditor({ 
      title: "你的名字？",
      placeholder: "请输入你的名字",
    })
    if(!res.confirm) return
    const hasVal = valTool.isStringWithVal(res.value)
    if(!hasVal) return
    userName = res.value
  }

  // 3. fetch
  const arg3: Param_AddVote = {
    userName,
    choices,
  }
  const url3 = APIs.ADD_VOTE
  cui.showLoading({ title: "提交中.." })
  const res3 = await liuReq.request(url3, arg3)
  cui.hideLoading()
  console.log("res3: ", res3)
  if(res3.code === "0000") {
    rr.router.push({ name: "result" })
  }
}


async function getCourses(
  fpData: FpData,
) {
  
  const res = await fetchCourses()
  const courses = res.data?.courses ?? []
  const list = turnCourseItemsIntoMyChoices(courses)
  fpData.myChoices = list
}

function turnCourseItemsIntoMyChoices(
  courses: CourseItem[],
) {
  const list: MyChoiceItem[] = []
  for(let i=0; i<courses.length; i++) {
    const course = courses[i]
    const myChoice: MyChoiceItem = {
      courseId: course.id,
      courseName: course.name,
      courseAuthor: course.author,
    }
    list.push(myChoice)
  }

  return list
}