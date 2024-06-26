import { createWebHashHistory, createRouter } from "vue-router";
import RestAreaList from "./../../app/rest-area-list/RestAreaList.vue";
import WikitableConverter from "./../../app/wikitable-converter/WikitableConverter.vue";
import GlobalLayout from "./../../app/GlobalLayout.vue";

const routes = [
  {
    path: "/",
    component: GlobalLayout,
    children: [
      {
        path: "",
        name: "rest-area-list",
        component: RestAreaList,
      },
      {
        path: "wikitable-converter",
        name: "wikitable-converter",
        component: WikitableConverter,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
