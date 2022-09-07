import { createApp } from "vue";
import { createPinia } from "pinia";
import Notifications from "@kyvg/vue3-notification";
import { createMetaManager } from "vue-meta";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.scss";
import "normalize.css/normalize.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Notifications);
app.use(createMetaManager());

app.mount("#app");
