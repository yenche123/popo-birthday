import liuEnv from "~/utils/liu-env"

const env = liuEnv.getEnv()
const d = env.API_DOMAIN ?? ""

export default {
  GET_COURSES: d + 'get-courses',
  GET_RESULT: d + 'get-result',
  ADD_VOTE: d + 'add-vote',
  CALCULATE_RESULT: d + 'calculate-result',
}