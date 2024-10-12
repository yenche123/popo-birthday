import { 
  createRouter, 
  createWebHistory,
} from "vue-router"
import { routes } from "./init-routes"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }