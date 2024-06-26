import { createMemoryHistory, createRouter } from "vue-router";
import RestAreaList from "./../../app/rest-area-list/RestAreaList.vue";
import WikitableConverter from "./../../app/wikitable-converter/WikitableConverter.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: RestAreaList,
  },
  {
    path: "/wikitable-converter",
    name: "wikitable-converter",
    component: WikitableConverter,
  },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
