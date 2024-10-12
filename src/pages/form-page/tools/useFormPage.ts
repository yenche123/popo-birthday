import { reactive } from "vue";
import { MyChoiceItem, type FpData } from "./types";
import { fetchCourses } from "~/pages/utils/requests";
import { type CourseItem } from "~/types";

export function useFormPage() {

  const fpData = reactive<FpData>({
    myChoices: [],
  })

  getCourses(fpData)
  
  return {
    fpData,
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