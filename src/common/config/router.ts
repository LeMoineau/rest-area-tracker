import { createMemoryHistory, createRouter } from "vue-router";
import Home from "../../app/home/Home.vue";

const routes = [{ path: "/", component: Home }];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
