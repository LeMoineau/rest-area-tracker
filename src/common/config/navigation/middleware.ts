import router from "./router";
import { getAuth } from "firebase/auth";

router.beforeEach((to, _) => {
  if (to.path.includes("profile") && getAuth().currentUser === null) {
    return { path: "/login" };
  }
});
