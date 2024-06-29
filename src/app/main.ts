import { createApp } from "vue";
import "./../common/config/global.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./../common/config/router";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import config from "../common/config/config";

const pinia = createPinia();
const env = config.getEnv();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(ElementPlus).use(pinia).mount("#app");
