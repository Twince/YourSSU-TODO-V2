import { createApp } from "vue";
import App from "./App.vue";

// import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
// import VueAxios from 'vue-axios'

// const app = Vue.createApp()
const app = createApp(App) 
app.config.globalProperties.$axios = axios; 
app.mount('#app')

// const app = createApp({});
// createApp(App).mount("#app");

