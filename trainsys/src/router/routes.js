import {createRouter, createWebHistory} from 'vue-router'
import Login from "../views/Login.vue"
import Users from "../views/Users.vue"
import Dashboard from "../views/Dashboard.vue"
import Exercises from "../views/Exercises.vue"
import StudentList from "../views/StudentList.vue"
import Student from "../views/Student.vue"
import Workouts from "../views/Workouts.vue"
import WorkoutsView from "../views/WorkoutsView.vue"



export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastro-usuario',
      name: 'users',
      component: Users
    },
    {
      path: '/cadastro-aluno',
      name: 'Student',
      component: Student
    },
    {
      path: '/cadastro-exercicio',
      name: 'exercises',
      component: Exercises
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },

    {
      path: '/lista-alunos',
      name: 'StudentList',
      component: StudentList
    },

    {
      path: '/cadastro-treino/:student_id',
      name: 'Workouts',
      component: Workouts
    },
    {
      path: '/visualizar-treinos/:student_id',
      name: 'WorkoutsView',
      component: WorkoutsView
    },
  ]
})