import Vue from 'vue'

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



 export const db = firebase.firestore()
 export const auth = firebase.auth
 export const currentUser = auth.currentUser

// export {
//     db,
//     auth,
//     currentUser,
// }
