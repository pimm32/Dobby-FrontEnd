import Vue from 'vue'
import Router from 'vue-router'
import PlayPage from './Views/PlayPage.vue'
import GamesPage from './Views/GamesPage.vue'
import ContactPage from './Views/ContactPage.vue'
import AccountPage from './Views/AccountPage.vue'
import NewGamePage from './Views/NewGamePage.vue'
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Dashboard from "./components/Dashboard.vue"
import PlayerPage from './Views/PlayersPage.vue'

Vue.use(Router)


 export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ './Views/Home.vue')
      },
      {
        path: '/play',
        name: 'Play',
        component: PlayPage
      },
      {
        path: '/games',
        name: 'Games',
        component: GamesPage
      },
      {
        path: '/contacts',
        name: 'Contact',
        component: ContactPage
      },
      {
        path: '/players',
        name: 'Players',
        component: PlayerPage
      },
      {
        path: '/account/:gebruiker',
        name: 'Account',
        component: AccountPage
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/newGame',
        name: 'newGame',
        component: NewGamePage
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
  ]
})