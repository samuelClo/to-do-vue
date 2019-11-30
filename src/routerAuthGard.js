import * as firebase from "firebase";
import Vue from 'vue'

export default (to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user)
            next()
        else {
            Vue.prototype.$currentUser = null
            if (to.fullPath === '/task-management' || to.fullPath === '/')
                next('/connect')
            next()
        }
    })
}
Vue.prototype.$fbAuth = firebase.auth
Vue.prototype.$fbDb = firebase.firestore

