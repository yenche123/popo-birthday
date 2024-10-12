import { type RouteRecordRaw } from "vue-router"

const LandingPage = () => import("../pages/landing-page/landing-page.vue")
const FormPage = () => import("../pages/form-page/form-page.vue")
const ResultPage = () => import("../pages/result-page/result-page.vue")
const CenterPage = () => import("../pages/center-page/center-page.vue")

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LandingPage,
    name: "landing",
  },
  {
    path: "/form",
    component: FormPage,
    name: "form",
  },
  {
    path: "/result",
    component: ResultPage,
    name: "result",
  },
  {
    path: "/center",
    component: CenterPage,
    name: "center",
  }
]
