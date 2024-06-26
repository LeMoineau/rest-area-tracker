import { createApp } from "vue";
import "./../common/config/global.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "../common/config/navigation/router";
import { createPinia } from "pinia";

//init firebase instances
import "./../common/config/firebase/firebase-instances";

//init middleware
import "./../common/config/navigation/middleware";

const pinia = createPinia();

createApp(App).use(router).use(ElementPlus).use(pinia).mount("#app");
