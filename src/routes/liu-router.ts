import { 
  useRouter as useVueRouter, 
  useRoute as useVueRoute,
  Router as VueRouter,
  type RouteLocationNormalizedLoaded,
} from "vue-router"

export interface RouteAndRouter {
  route: RouteLocationNormalizedLoaded
  router: VueRouter
}

const useRouteAndRouter = (): RouteAndRouter => {
  const router = useVueRouter()
  const vueRoute = useVueRoute()
  return { router, route: vueRoute }
}

export { useRouteAndRouter }