import Vue from 'vue'
import Router from 'vue-router'

// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
// import Home from './components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
// import Welcome from './components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/user/Users.vue')

const List = () => import(/* webpackChunkName: "Order_Report" */ './components/list/List.vue')
const List2 = () => import(/* webpackChunkName: "Order_Report" */ './components/list/List2.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/list', component: List },
        { path: '/list2', component: List2 },
      ]
    }
  ]
})


export default router
