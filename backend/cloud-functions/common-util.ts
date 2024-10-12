// Function Name: common-util

import * as vbot from "valibot"

/********************* empty function ****************/
export async function main(ctx: FunctionContext) {
  console.log("do nothing with common-util")
  return true
}


/********************* useful functions ****************/
function getErrMsgFromIssues(issues: vbot.SchemaIssues) {
  const issue = issues?.[0]
  const msg = issue?.message
  return msg ?? "get error from valibot"
}

export const checker = {
  getErrMsgFromIssues,
}