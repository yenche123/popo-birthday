import { 
  Sch_X_Liu,
  type LiuRqReturn,
} from "@/common-types"
import * as vbot from "valibot"

export async function main(
  ctx: FunctionContext, next: any
) {
  const res4 = checkEntry(ctx)
  if(!res4) {
    return { code: "E4000", errMsg: "checkEntry error......" }
  }

  const res5 = await toNext(ctx, next)
  return res5
}


async function toNext(
  ctx: FunctionContext,
  next: any,
) {
  let nextRes: LiuRqReturn<any> | null = null
  try {
    nextRes = await next(ctx)
  }
  catch(err: any) {
    console.error(`next 异常`)
    console.log(err)
    return { code: `E5002` }
  }

  return nextRes
}


function checkEntry(ctx: FunctionContext) {

  // 1. 检查常规的 x_liu_
  const body = ctx.request?.body ?? {}
  const res1 = vbot.safeParse(Sch_X_Liu, body)
  if(!res1.success) {
    console.warn("checking out x_liu_ fields failed.......")
    console.log(res1.issues)
    return false
  }

  return true
}