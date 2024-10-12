import cui from "~/components/custom-ui"
import { useRouteAndRouter } from "~/routes/liu-router"
import valTool from "~/utils/basic/val-tool"
import liuApi from "~/utils/liu-api"

export function useLandingPage() {

  const rr = useRouteAndRouter()

  const onTapBtn = async () => {
    const res = await cui.showTextEditor({ 
      title: "你的名字？",
      placeholder: "请输入你的名字",
    })
    if(!res.confirm) return
    const name = res.value
    const hasVal = valTool.isStringWithVal(name)
    if(!hasVal) return

    liuApi.setStorageSync("name", name)
    rr.router.push({ name: "form" })
  }

  return {
    onTapBtn,
  }
}