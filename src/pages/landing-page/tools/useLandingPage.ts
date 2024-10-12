import cui from "~/components/custom-ui"
import { fetchCourses } from "~/pages/utils/requests"
import { useRouteAndRouter } from "~/routes/liu-router"
import valTool from "~/utils/basic/val-tool"
import liuApi from "~/utils/liu-api"

export function useLandingPage() {

  const rr = useRouteAndRouter()

  const onTapBtn = async () => {
    preFetchCourses()
    let name = liuApi.getStorageSync<string>("name") ?? ""
    const res = await cui.showTextEditor({ 
      title: "你的名字？",
      placeholder: "请输入你的名字",
      value: name,
    })
    if(!res.confirm) return
    const hasVal = valTool.isStringWithVal(res.value)
    if(!hasVal) return
    name = res.value

    liuApi.setStorageSync("name", name)
    rr.router.push({ name: "form" })
  }

  return {
    onTapBtn,
  }
}

async function preFetchCourses() {
  await fetchCourses()
}