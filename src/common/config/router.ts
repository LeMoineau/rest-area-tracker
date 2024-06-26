import { createWebHashHistory, createRouter } from "vue-router";
import RestAreaList from "./../../app/rest-area-list/RestAreaList.vue";
import WikitableConverter from "./../../app/wikitable-converter/WikitableConverter.vue";
import GlobalLayout from "./../../app/GlobalLayout.vue";
import RestAreaPage from "./../../app/rest-area-page/RestAreaPage.vue";

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
        path: "/wikitable-converter",
        name: "wikitable-converter",
        component: WikitableConverter,
      },
      {
        path: "/rest-area/:id",
        name: "rest-area",
        component: RestAreaPage,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
