
export interface MyChoiceItem {
  courseId: string
  courseName: string
  courseAuthor?: string
  score?: number
}

export interface FpData {
  myChoices: MyChoiceItem[]
}