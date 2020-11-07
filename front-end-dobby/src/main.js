import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase";
import '@firebase/auth'
import store from "./store";
import router from './router'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

const CONFIGOPSTIONS = {
  apiKey: "AIzaSyCs81z6-EW0RZxk9jR5Y7hMRVDQqvW0M60",
  authDomain: "dobby-frontend.firebaseapp.com",
  databaseURL: "https://dobby-frontend.firebaseio.com",
  projectId: "dobby-frontend",
  storageBucket: "dobby-frontend.appspot.com",
  messagingSenderId: "826140059227",
  appId: "1:826140059227:web:73850a76cafeed494d017e",
  measurementId: "G-CNHSQMQXED"
}

firebase.initializeApp(CONFIGOPSTIONS);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
