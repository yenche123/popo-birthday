import type { Res_GetResult } from "~/types";


export interface RpData {
  rs?: Res_GetResult
  bestCourseId?: string
  loading: boolean
  refreshRotateDeg: number
}