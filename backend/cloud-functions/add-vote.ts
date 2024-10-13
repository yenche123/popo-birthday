// Function Name: add-vote
import * as vbot from "valibot"
import cloud from "@lafjs/cloud"
import { 
  type ChoiceItem, 
  Sch_Param_AddVote, 
  type Table_Vote,
  type Partial_Id,
} from "@/common-types"
import { checker } from "@/common-util"

const db = cloud.database()

export async function main(ctx: FunctionContext) {
  
  // 1. check entry
  const err1 = checkEntry(ctx)
  if(err1) return err1

  // 2. add vote
  const res2 = await toAddVote(ctx)
  return res2
}


async function toAddVote(ctx: FunctionContext) {
  const body = ctx.request?.body ?? {}
  const userId = body.x_liu_user_id as string
  const userName = body.userName as string
  const choices = body.choices as ChoiceItem[]

  const newVote: Partial_Id<Table_Vote> = {
    userId,
    userName,
    choices,
    createdStamp: Date.now(),
  }
  const vCol = db.collection("Vote")
  const res1 = await vCol.add(newVote)

  checkRepeatedVote(userId)

  return { code: "0000" }
}

async function checkRepeatedVote(
  userId: string
) {
  const vCol = db.collection("Vote")
  const res1 = await vCol.where({ userId }).orderBy("createdStamp", "asc").get()
  const votes = res1.data ?? []
  if(votes.length < 2) return

  const firstVote = votes[0]
  console.warn("discover repeated vote: ")
  console.log(firstVote)
  const res2 = await await vCol.doc(firstVote._id).remove()
  console.log("delete result: ")
  console.log(res2)
  return true
}

function checkEntry(ctx: FunctionContext) {
  const body = ctx.request?.body ?? {}
  const res1 = vbot.safeParse(Sch_Param_AddVote, body)
  if(!res1.success) {
    const errMsg = checker.getErrMsgFromIssues(res1.issues)
    return { code: "E4000", errMsg }
  }

}