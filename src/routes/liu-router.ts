import { 
  useRouter as useVueRouter, 
  useRoute as useVueRoute,
} from "vue-router"

const useRouteAndRouter = () => {
  const router = useVueRouter()
  const vueRoute = useVueRoute()
  return { router, route: vueRoute }
}

export { useRouteAndRouter }