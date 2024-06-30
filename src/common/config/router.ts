import { createWebHashHistory, createRouter } from "vue-router";
import RestAreaList from "./../../app/rest-area-list/RestAreaList.vue";
import WikitableConverter from "./../../app/wikitable-converter/WikitableConverter.vue";
import GlobalLayout from "./../../app/GlobalLayout.vue";
import RestAreaPage from "./../../app/rest-area-page/RestAreaPage.vue";
import RegisterPage from "./../../app/register/RegisterPage.vue";
import LoginPage from "../../app/login/LoginPage.vue";
import ProfileLayout from "../../app/profile/ProfileLayout.vue";
import ProfileHomePage from "../../app/profile/home/ProfileHomePage.vue";
import ProfileSettingsPage from "../../app/profile/settings/ProfileSettingsPage.vue";

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
      {
        path: "/register",
        name: "register",
        component: RegisterPage,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/profile",
        name: "profile",
        component: ProfileLayout,
        children: [
          {
            path: "",
            component: ProfileHomePage,
          },
          {
            path: "settings",
            component: ProfileSettingsPage,
          },
        ],
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
