// Function Name: get-courses
import type { Table_Course, CourseItem } from "@/common-types"
import cloud from "@lafjs/cloud"

const db = cloud.database()

export async function main(ctx: FunctionContext) {
  // 1. get course from db
  const cCol = db.collection("Course")
  const res = await cCol.orderBy("no", "asc").get<Table_Course>()
  const list = res.data
  
  // 2. turn course into items
  const courses = formatCourses(list)
  return { code: "0000", data: { courses } }
}


function formatCourses(courses: Table_Course[]) {
  const list: CourseItem[] = []
  for(let i=0; i<courses.length; i++) {
    const v = courses[i]
    list.push({
      id: v._id,
      name: v.name,
      author: v.author,
    })
  }
  return list
}