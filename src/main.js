import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxlLf1WbmM-RPEXvnsmcZJodFqrnp6uC0",
    authDomain: "todo-heracles.firebaseapp.com",
    databaseURL: "https://todo-heracles.firebaseio.com",
    projectId: "todo-heracles",
    storageBucket: "todo-heracles.appspot.com",
    messagingSenderId: "34434545195",
    appId: "1:34434545195:web:61f8b1d63b5b090490dc6e"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.prototype.$fbAuth = firebase.auth
Vue.prototype.$fbDb = firebase.firestore
Vue.prototype.$currentUser = firebase.auth().currentUser


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
