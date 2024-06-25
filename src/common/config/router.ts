import { createMemoryHistory, createRouter } from "vue-router";
import Home from "../../app/home/Home.vue";
import HelloWorld from "./../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    component: Home,
    children: [{ path: "", name: "home", component: HelloWorld }],
  },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
