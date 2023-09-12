import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Users from "../views/Users.vue"

export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
  ]
})