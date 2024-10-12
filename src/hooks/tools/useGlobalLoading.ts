import { useRouteAndRouter } from "~/routes/liu-router"
import { showGlobalLoading, hideGlobalLoading } from "~/components/global-loading"
import type { LiuTimeout } from "~/utils/basic/type-tool";

const DURATION_LOADING = 190

export function useGlobalLoading() {
  const { router } = useRouteAndRouter()

  let s1: number = 0
  let s2: number = 0
  let timeout: LiuTimeout

  const _beforeEach = async () => {
    timeout = setTimeout(() => {
      timeout = undefined
      showGlobalLoading()
    }, DURATION_LOADING)
  }

  router.beforeEach(() => {
    s1 = Date.now()
    s2 = 0

    _beforeEach()
  })

  router.beforeResolve(() => {
    s2 = Date.now()

    if(timeout) {
      clearTimeout(timeout)
    }
    else {
      // 去隐藏 loading
      hideGlobalLoading()
    }

    timeout = undefined
  })
}