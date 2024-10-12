import cui from "~/components/custom-ui"
import APIs from "~/requests/APIs"
import liuReq from "~/requests/liu-req"
import { useRouteAndRouter } from "~/routes/liu-router"


export function useCenterPage() {
  const rr = useRouteAndRouter()

  const onTapBtn = async () => {
    const res = await cui.showModal({ title: "🚀", content: "确定要截止投票？" })
    if(!res.confirm) return
    
    const url = APIs.CALCULATE_RESULT

    cui.showLoading({ title: "计算中.." })
    const res2 = await liuReq.request(url)
    cui.hideLoading()

    console.log("res2: ", res2)
    
    rr.router.replace({ name: "result" })
  }

  return {
    onTapBtn,
  }
}