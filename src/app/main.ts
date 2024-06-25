import { createApp } from "vue";
import "./../common/config/global.css";
import App from "./App.vue";
import router from "./../common/config/router";

createApp(App).use(router).mount("#app");
