import { createApp } from "vue";
import "./../common/config/global.css";
import App from "./App.vue";
import router from "./../common/config/router";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
