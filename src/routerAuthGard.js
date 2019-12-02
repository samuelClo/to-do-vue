import * as firebase from "firebase";
import Vue from 'vue'

export default (to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            if (to.fullPath === '/connect')
                next('/task-management')

            next()
        }

        else {
            if (to.fullPath === '/task-management' || to.fullPath === '/')
                next('/connect')
            next()
        }
    })
}


